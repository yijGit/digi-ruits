import * as Dat from 'dat.gui';
import { Scene, Color, MeshBasicMaterial, PlaneGeometry, Vector3, CylinderGeometry, Mesh, TextureLoader, MeshStandardMaterial} from 'three';
import { Flower, Land, Ball, Table, Arrow } from 'objects';
import { Sphere, Body, World, GSSolver, SplitSolver, NaiveBroadphase, Material, ContactMaterial, Plane, Vec3, Cylinder } from 'cannon';
import { BasicLights, CupLightsBlue, CupLightsYellow, StripLights } from 'lights';
import { Cup, Rack } from '../objects';
import MODEL from '../objects/Cup/cup.gltf';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class MainScene extends Scene {
    constructor(camera) {
        super();

        this.state = {
            gui: new Dat.GUI(),
            mouseClick: false,
            power: 5,
            shootDirection: new Vector3(0, 0, -1),
            updateList: [],
        };

        this.background = new Color(0x0ec088);

        const land = new Land();
        const flower = new Flower(this);
        const lights = new BasicLights();

        // Add meshes to scene
        //***NEEDS TO BE INCORPORATED INTO SCENE */
        const blueLight = new CupLightsBlue(this);
        const yellowLight = new CupLightsYellow(this);
        const table = new Table();

        this.add(table);
        /* END SCENE INCORPORATION */

        this.state.gui.add(this.state, 'power', 1, 10);

        //window.addEventListener('click', this.handleMouseClick.bind(this), false);
        window.addEventListener('keydown', this.handleKeyDownEvents.bind(this), false);
        this.initCannon();
        this.init();

        // const blueRack = new Rack(this, 0);
        // const yellowRack = new Rack(this, 1);

        this.add(lights);
        // this.add(yellowRack);
        // this.add(blueRack);

        //this.animate();

        // this.add(blueLight);
        // this.add(yellowLight);

        const strip = new StripLights(this);
        this.add(strip);
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
        var split = true;
        if (split)
            world.solver = new SplitSolver(solver);
        else
            world.solver = solver;

        world.gravity.set(0, -9.81, 0);
        world.broadphase = new NaiveBroadphase();

        // Create a slippery material (friction coefficient = 0.0)
        const groundMaterial = new Material('ground');
        const groundCM = new ContactMaterial(groundMaterial, groundMaterial, {
            friction: 0.4,
            restitution: 0.3,
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
        console.log(world);

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
        
        const groundShape = new Plane();
        const groundBody = new Body({ mass: 0, material: this.groundMaterial });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2);
        this.groundBody = groundBody;
        this.world.addBody(groundBody);

        // cup

        // const cup = new Cup(this, 1, 1);
        // this.add(cup);
        const cupShape = new Cylinder(0.5, 0.35, 1, 32, 32);
        const cupBody = new Body({
            mass: 1000,
            material: this.groundMaterial,
            position: new Vector3(0, 0.5, 0),
        });
        cupBody.addShape(cupShape);
        cupBody.linearDamping = 0.1;
        this.cupBody = cupBody;

        const cupGeometry = new CylinderGeometry(0.5, 0.35, 1, 32, 1, false);
        const cupMaterial = new MeshStandardMaterial();
        const cupMesh = new Mesh(cupGeometry, cupMaterial);

        this.add(cupMesh);
        this.cupMesh = cupMesh;
        this.world.addBody(cupBody);
    }

    setupCups() {

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
            //const mat = new ContactMaterial(this.groundBody.material, ball.body.material, { friction: 0.0, restitution: 0.75 });
            //this.world.addContactMaterial(mat);
            ball.shootBall();
            this.add(ball);
        }
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { updateList } = this.state;
        this.world.step(1 / 60);
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
        this.cupMesh.position.copy(this.cupBody.position);
    }
}

export default MainScene;