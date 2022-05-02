import * as Dat from 'dat.gui';
import { Scene, Color, MeshBasicMaterial, PlaneGeometry} from 'three';
import { Flower, Land, Ball, Table } from 'objects';
import { Sphere, Body, World, GSSolver, SplitSolver, NaiveBroadphase, Material, ContactMaterial, Plane, Vec3 } from 'cannon';
import { BasicLights, CupLightsBlue, CupLightsYellow, StripLights, StripLightsBlue, StripLightsRed, StripLightsWhite} from 'lights';
import { Cup, Rack } from '../objects';

class MainScene extends Scene {
    constructor(camera) {
        super();

        this.state = {
            gui: new Dat.GUI(),
            power: 1,
            mouseClick: false,
            updateList: [],
        };

        this.background = new Color(0x0ec088);
        const lights = new BasicLights();

        // Add meshes to scene
        //***NEEDS TO BE INCORPORATED INTO SCENE */
        const blueLight = new CupLightsBlue(this);
        const yellowLight = new CupLightsYellow(this);
        const table = new Table();


        this.add(table);
        /* END SCENE INCORPORATION */

        this.state.gui.add(this.state, 'power', 1, 10);

        window.addEventListener('click', this.handleMouseClick.bind(this), false);
        this.initCannon();
        this.init();

        // const blueRack = new Rack(this, 0);
        // const yellowRack = new Rack(this, 1);

        this.add(lights);
        // this.add(yellowRack);
        // this.add(blueRack);
        var cup = new Cup(this, 1, 1);
        this.add(cup);
        this.world.addBody(cup.body);
        //this.animate();
        this.cupMaterial = cup.body.material;

        this.add(blueLight);
        this.add(yellowLight);

        const strip = new StripLights(this);
        this.add(strip);
        const stripBlue = new StripLightsBlue(this);
        this.add(stripBlue);
        const stripRed = new StripLightsRed(this);
        this.add(stripRed);
        const stripWhite = new StripLightsWhite(this);
        this.add(stripWhite);
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
        const physicsMaterial = new Material('slipperyMaterial');
        const physicsContactMaterial = new ContactMaterial(
            physicsMaterial,
            physicsMaterial,
            0.0, // friction coefficient
            0.3  // restitution
        );
        // We must add the contact materials to the world
        world.addContactMaterial(physicsContactMaterial);

        const groundMaterial = new Material('ground');

        // Create a plane
        
        const groundShape = new Plane();
        const groundBody = new Body({ mass: 0, material: groundMaterial });
        groundBody.addShape(groundShape);
        groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
        this.groundBody = groundBody;
        world.addBody(groundBody);
    }

    init() {

    }

    handleMouseClick(event) {
        const edgeOffset = 30.0;
        const ball = new Ball(this, this.state.power);
        const mat1_ground = new ContactMaterial(this.groundBody.material, ball.body.material, { friction: 0.0, restitution: 0.75 });
        this.world.addContactMaterial(mat1_ground);
        ball.shootBall();
        this.add(ball);
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
    }
}

export default MainScene;