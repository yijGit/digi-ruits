import * as Dat from 'dat.gui';
import { Scene, Color, MeshBasicMaterial, PlaneGeometry, Vector3, CylinderGeometry, Mesh, TextureLoader, MeshStandardMaterial} from 'three';
import { Flower, Land, Ball, Table, Arrow } from 'objects';
import { Sphere, Body, World, GSSolver, SplitSolver, NaiveBroadphase, Material, ContactMaterial, Plane, Vec3, Cylinder, Box, Quaternion } from 'cannon-es';
import { BasicLights, CupLightsBlue, CupLightsYellow, StripLights } from 'lights';
import { Cup, Rack } from '../objects';
import MODEL from '../objects/Cup/cup.gltf';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { StripLightsBlue, StripLightsRed, StripLightsWhite } from '../lights';

class MainScene extends Scene {
    constructor(camera) {
        super();

        this.state = {
            gui: new Dat.GUI(),
            powerInc: false,
            spaceDown: false,
            power: 0,
            camera: camera,
            shootDirection: new Vector3(0, 0, 1),
            ball_instances: 0,
            ball_needs_delete: false,
            updateList: [],
            cup_needs_delete: false,
            cup_to_delete: [],
            rerack_blue: false,
            rerack_yellow: false,
            cups_blue: 12,
            cups_yellow: 12,
            rerack_blue_done: false,
            rerack_yellow_done: false,
            current_player: 0,
            ball_pos: new Vector3(0, 0, -7),
        };
        var bkg;
        const loader = new TextureLoader();
        bkg = loader.load('src/components/scenes/bkg.jpg' , function(texture)
            {
             bkg = texture;  
            });

            this.background = bkg;
        const land = new Land();
        const flower = new Flower(this);
        const lights = new BasicLights();

        // Add meshes to scene
        //***NEEDS TO BE INCORPORATED INTO SCENE */
        const blueLight = new CupLightsBlue(this);
        const yellowLight = new CupLightsYellow(this);
        // const table = new Table();

        // this.add(table);
        // console.log(table);
        /* END SCENE INCORPORATION */

        this.state.gui.add(this.state, 'power', 0, 10);

        window.addEventListener('keydown', this.handleKeyDownEvents.bind(this), false);
        window.addEventListener('keyup', this.handleKeyUpEvents.bind(this), false);
        this.initCannon();
        this.setupScene();

        //Add lights!
        const blueRack = new Rack(this, 0);
        const yellowRack = new Rack(this, 1);

        this.add(lights);
        this.add(yellowRack);
        this.add(blueRack);

        // const red = new StripLightsRed(this);
        // const white = new StripLightsWhite(this);
        // const green = new StripLights(this);
        // const blue = new StripLightsBlue(this);
        // this.add(red,white,green,blue);

        // this.add(blueLight);
        // this.add(yellowLight);
    }

    initCannon() {
        const world = new World();
        this.world = world;
        world.quatNormalizeSkip = 0;
        world.quatNormalizeFast = false;

        const solver = new GSSolver();

        world.defaultContactMaterial.contactEquationStiffness = 1e9;
        world.defaultContactMaterial.contactEquationRelaxation = 4;

        solver.iterations = 7;
        solver.tolerance = 0.1;
        const split = true;
        if (split)
            world.solver = new SplitSolver(solver);
        else
            world.solver = solver;

        world.gravity.set(0, -9.81, 0);
        world.broadphase = new NaiveBroadphase();

        // Create a slippery material (friction coefficient = 0.0)
        const groundMaterial = new Material('ground');
        const groundCM = new ContactMaterial(groundMaterial, groundMaterial, {
            friction: 0.3,
            restitution: 0.0,
            contactEquationStiffness: 1e8,
            contactEquationRelaxation: 3,
            frictionEquationStiffness: 1e8,
            frictionEquationRegularizationTime: 3,
        });
        // We must add the contact materials to the world
        world.addContactMaterial(groundCM);
        this.groundMaterial = groundMaterial;
        
        const bounceMaterial = new Material('bounce');
        const bounceCM = new ContactMaterial( groundMaterial, bounceMaterial, { 
            friction: 0.0,
            restitution: 0.75 
        });
        // We must add the contact materials to the world
        world.addContactMaterial(bounceCM);
        this.bounceMaterial = bounceMaterial;
    }

    setupArrow() {
        let pos;
        if (this.state.current_player === 0) {
            pos = new Vector3(0, 0.25, -7);
        }
        else {
            pos = new Vector3(0, 0.25, 7);
        }
        console.log(pos);
        const arrow = new Arrow(this, pos);
        this.add(arrow);
        this.arrow = arrow;
    }

    setupScene() {
        this.setupArrow();

        // Create a table-sized box
        const tableDim = new Vector3(2.8, 2.4775, 6);
        const tablePos = new Vector3(0, -3, 0);
        const table = new Table(this, tableDim, tablePos);
        this.add(table);
    }

    handleKeyDownEvents(event) {
        const angle = 0.03;
        const axis = new Vector3(0, 1, 0);
        const key = event.key;
        if (key === 'a') {
            this.state.shootDirection.applyAxisAngle(axis, angle);
            if (this.state.current_player === 1) {
                this.arrow.updateShotRotate(-angle);
            }
            else {
                this.arrow.updateShotRotate(angle);
            }
        }
        else if (key === 'd') {
            this.state.shootDirection.applyAxisAngle(axis, -angle);
            if (this.state.current_player === 1) {
                this.arrow.updateShotRotate(angle);
            }
            else {
                this.arrow.updateShotRotate(-angle);
            }
        }
        else if (key === 'r') {
            this.state.ball_needs_delete = true;
        }
        else if (key === ' ') {
            if (this.state.ball_instances == 0) {
                this.state.spaceDown = true;
                if (this.state.power >= 10) {
                    this.state.powerInc = false;
                }
                else if (this.state.power <= 0) {
                    this.state.powerInc = true;
                }
                if (this.state.powerInc) {
                    this.state.power += 1;
                    this.state.gui.__controllers[4].setValue(this.state.power);
                }
                else {
                    this.state.power -= 1;
                    this.state.gui.__controllers[4].setValue(this.state.power);
                }
            }
        }
    }

    handleKeyUpEvents(event) {
        const key = event.key;
        if (key === ' ') {
            if (this.state.spaceDown === true) {
                const ball = new Ball(this, this.state.power / 10 + 2.5, this.state.shootDirection, this.state.ball_pos);
                this.state.ball_instances++;
                ball.shootBall();
                this.add(ball);
            }
            this.state.spaceDown = false;
            this.state.power = 0;
            this.state.gui.__controllers[4].setValue(this.state.power);
        }
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { updateList } = this.state;
        this.world.fixedStep();

         // what to do if rerack blue
         if (this.state.rerack_blue && this.state.cups_blue == 6 && !this.state.rerack_blue_done) {
            this.state.rerack_blue = false;
            this.state.rerack_blue_done = true;
            var rack = this.getObjectByName("blue_rack");
            //make blue rerack position list
            var rerack_pos = [];
            rerack_pos.push(new Vector3((-1) * 0.65, 0.4, (0 - 5) * 1.1));
            rerack_pos.push(new Vector3((1) * 0.65, 0.4, (0 - 5) * 1.1));
            rerack_pos.push(new Vector3(0, 0.4, (0 - 5) * 1.1));
            rerack_pos.push(new Vector3((-0.5) * 0.65, 0.4, (0.5 - 5) * 1.1));
            rerack_pos.push(new Vector3((0.5) * 0.65, 0.4, (0.5 + -5) * 1.1));
            rerack_pos.push(new Vector3((0) * 0.65, 0.4, (1 + -5) * 1.1));
            var pos_index = 0;
            console.log("got here!");
            for (let i = 0; i < 12; i++) {
                if (rack.children[i].name == "cup") {
                    rack.children[i].body.position.copy(rerack_pos[pos_index]);
                    pos_index++;
                }
            }
        }

        // what to do if rerack yellow
        if (this.state.rerack_yellow && this.state.cups_yellow == 6 && !this.state.rerack_yellow_done) {
            this.state.rerack_yellow = false;
            this.state.rerack_yellow_done = true;
            var rack = this.getObjectByName("yellow_rack");
            //make yellow rerack position list
            var rerack_pos = [];
            rerack_pos.push(new Vector3((-1) * 0.65, 0.4, (10 - 5) * 1.1));
            rerack_pos.push(new Vector3((1) * 0.65, 0.4, (10 - 5) * 1.1));
            rerack_pos.push(new Vector3(0, 0.4, (10 - 5) * 1.1));
            rerack_pos.push(new Vector3((-0.5) * 0.65, 0.4, (9.5 - 5) * 1.1));
            rerack_pos.push(new Vector3((0.5) * 0.65, 0.4, (9.5 + -5) * 1.1));
            rerack_pos.push(new Vector3((0) * 0.65, 0.4, (9 + -5) * 1.1));
            var pos_index = 0;
            console.log("got here!");
            for (let i = 0; i < 12; i++) {
                if (rack.children[i].name == "cup") {
                    rack.children[i].body.position.copy(rerack_pos[pos_index]);
                    pos_index++;
                }
            }
        }

        for (const obj of updateList) {
            if (obj.name != "dead") obj.update(timeStamp);
            // ball removal
            if (obj.name == "ball") {
                if (this.state.ball_needs_delete) {
                    console.log("out of bounds!");
                    obj.selfDestruct();
                    this.remove(obj.mesh);
                    this.world.removeBody(obj.body);
                    this.state.ball_needs_delete = false;
                    this.state.ball_instances = 0;
                    obj.name = "dead";
                    if (this.state.current_player === 1) {
                        this.state.current_player = 0;
                    }
                    else {
                        this.state.current_player = 1; 
                    }

                    if (this.state.current_player === 0) {
                        this.state.camera.position.set(0, 3, -10);
                        this.state.ball_pos = new Vector3(0, 0, -7);
                        this.state.shootDirection = new Vector3(0, 0, 1);
                        this.remove(this.arrow);
                        this.setupArrow();
                    }
                    else {
                        this.state.camera.position.set(0, 3, 10);
                        this.state.ball_pos = new Vector3(0, 0, 7);
                        this.state.shootDirection = new Vector3(0, 0, -1);
                        this.remove(this.arrow);
                        this.setupArrow();
                    }
                }
            }
        }
        // cup removal
        if (this.state.cup_needs_delete) {
            var dead_cup = this.state.cup_to_delete.pop();
            dead_cup.selfDestruct();
            this.remove(dead_cup.mesh);
            this.world.removeBody(dead_cup.body);
            this.state.cup_needs_delete = false;
            dead_cup.name = "dead";
        }

        //pop "dead" objects
        for (let i = 0; i < updateList.length; i++) {
            var obj = updateList[i];
            if (obj.name == "dead") {
                for (let j = i; j < updateList.length - 1; j++) {
                    updateList[j] = updateList[j + 1];
                }
                updateList.pop();
            }
        }

       

        // this.cupMesh.position.copy(this.cupBody.position);
    }
}

export default MainScene;