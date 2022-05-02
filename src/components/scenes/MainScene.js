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
            mouseClick: false,
            power: 5,
            shootDirection: new Vector3(0, 0, 1),
            updateList: [],
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
        const table = new Table();

        this.add(table);
        console.log(table);
        /* END SCENE INCORPORATION */

        this.state.gui.add(this.state, 'power', 1, 10);

        //window.addEventListener('click', this.handleMouseClick.bind(this), false);
        window.addEventListener('keydown', this.handleKeyDownEvents.bind(this), false);
        this.initCannon();
        this.init();

        //Add lights!
        //const blueRack = new Rack(this, 0);
        //const yellowRack = new Rack(this, 1);

        this.add(lights);
        //this.add(yellowRack);
        //this.add(blueRack);

        
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

        // Create a plane

        //this.add(groundBody);
    }

    init() {
        const pos = new Vector3(0, 0, 0);
        const arrow = new Arrow(this, pos);
        this.add(arrow);
        this.arrow = arrow;

        //const groundMaterial = new Material('ground');

        // Create a plane
        
        // const groundShape = new Plane();
        // const groundBody = new Body({ mass: 0, material: this.groundMaterial });
        // groundBody.addShape(groundShape);
        // groundBody.quaternion.setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2);
        // this.groundBody = groundBody;
        // this.world.addBody(groundBody);

        // Create a table-sized box

        const tableShape = new Box(new Vec3(6 / 2, 6 / 2, 6 / 2));
        const tableBody = new Body({
            mass: 0, 
            material: this.groundMaterial
        });
        tableBody.addShape(tableShape);
        tableBody.position.set(0, -3, 0);
        this.world.addBody(tableBody);

        // cup
        const cupShape = new Cylinder(0.3, 0.2, 0.8, 32, 32);
        const cupBody = new Body({
            mass: 10,
            material: this.groundMaterial,
            position: new Vector3(0, 0.4, 0),
        });
        cupBody.addShape(cupShape);

        cupBody.linearDamping = 0.1;
        cupBody.addEventListener('collide', this.handleCupCollision);
        this.cupBody = cupBody;
        this.world.addBody(cupBody);

        const cupGeometry = new CylinderGeometry(0.3, 0.2, 0.8, 32, 32, true);
        //cupGeometry.rotateX(Math.PI/2);
        const cupMaterial = new MeshStandardMaterial();
        const cupMesh = new Mesh(cupGeometry, cupMaterial);

        this.add(cupMesh);
        this.cupMesh = cupMesh;
    }

    handleCupCollision(event) {
        console.log('hit');
    }

    handleKeyDownEvents(event) {
        const angle = 0.05;
        const axis = new Vector3(0, 1, 0);
        const key = event.key;
        if (key === 'a') {
            this.arrow.show();
            this.state.shootDirection.applyAxisAngle(axis, angle);
            this.arrow.updateShotDirectionPower(axis, angle);
        } 
        else if (key === 'd') {
            this.state.shootDirection.applyAxisAngle(axis, -angle);
            this.arrow.updateShotDirectionPower(axis, -angle);
        }
        else if (key === ' ') {
            const ball = new Ball(this, this.state.power, this.state.shootDirection);
            ball.shootBall();
            this.add(ball);
        }
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { updateList } = this.state;
        this.world.fixedStep();
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
        this.cupMesh.position.copy(this.cupBody.position);
    }
}

export default MainScene;