import * as Dat from 'dat.gui';
import { Scene, Color, Vector3 } from 'three';
import { Flower, Land, Ball, Table, Rack, Arrow } from 'objects';
import { Sphere, Body, World, GSSolver, SplitSolver, NaiveBroadphase, Material, ContactMaterial, Plane, } from 'cannon';
import { BasicLights, CupLightsBlue, CupLightsYellow } from 'lights';

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

        this.background = new Color(0x7ec0ee);

        const land = new Land();
        const flower = new Flower(this);
        const lights = new BasicLights();

                // Add meshes to scene
        //***NEEDS TO BE INCORPORATED INTO SCENE */
        const blueLight = new CupLightsBlue(this);
        const yellowLight = new CupLightsYellow(this);
        const table = new Table();
        const blueRack = new Rack(this, 0);
        const yellowRack = new Rack(this, 1);

        // this.add(blueLight);
        // this.add(yellowLight);
        this.add(lights);
        this.add(blueRack);
        this.add(yellowRack);
        this.add(table);
        /* END SCENE INCORPORATION */

        this.state.gui.add(this.state, 'power', 1, 10);

        //window.addEventListener('click', this.handleMouseClick.bind(this), false);
        window.addEventListener('keydown', this.handleKeyDownEvents.bind(this), false);
        this.initCannon();
        this.init();
        //this.animate();
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
        if(split)
            world.solver = new SplitSolver(solver);
        else
            world.solver = solver;

        world.gravity.set(0,-9.81,0);
        world.broadphase = new NaiveBroadphase();

        // Create a slippery material (friction coefficient = 0.0)
        const physicsMaterial = new Material('slipperyMaterial');
        const physicsContactMaterial = new ContactMaterial(
            physicsMaterial,
            physicsMaterial,
            0.0, // friction coefficient
            0.3  // restitution
        );
        // We must add the contact materials to the world
        world.addContactMaterial(physicsContactMaterial);

        // Create a plane

        //this.add(groundBody);
    }

    init() {
        const pos = new Vector3(0, 0, 0);
        const arrow = new Arrow(this, pos);
        this.add(arrow);
        this.arrow = arrow;

        const groundMaterial = new Material('ground');
        const groundShape = new Plane();
        const groundBody = new Body({ mass: 0, material: groundMaterial });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
        this.groundBody = groundBody;
        this.world.addBody(groundBody);
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
            const mat = new ContactMaterial(this.groundBody.material, ball.body.material, { friction: 0.0, restitution: 0.75});
            this.world.addContactMaterial(mat);
            ball.shootBall();
            this.add(ball);
        }
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { updateList } = this.state;
        this.world.step(1/60);
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default MainScene;