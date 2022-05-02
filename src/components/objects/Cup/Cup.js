import {
    Group, Box3,
    Vector3,
    TextureLoader,
    SphereGeometry,
    MeshStandardMaterial,
    Mesh, MeshBasicMaterial, CylinderGeometry, MeshNormalMaterial, BoxGeometry
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './cup.gltf';
import { Sphere, Box, Cylinder, Body, Shape, ConvexPolyhedron, ContactMaterial } from 'cannon-es';


class Cup extends Group {
    constructor(parent, x, y, z) {
        // Call parent Group() constructor
        super();
        //const loader = new GLTFLoader();
        this.parent = parent;

        this.state = {}

        // loader.load(MODEL, (gltf) => {
        //     this.add(gltf.scene);
        // });

        // Handles Collisions
        this.initBody(x, y, z);

        // 
        this.initMesh();

        parent.addToUpdateList(this);
    }

    initBody(x, y, z) {
        const cupShape = new Cylinder(0.3, 0.2, 0.8, 32, 32);
        const cupBody = new Body({
            mass: 10,
            material: this.parent.groundMaterial,
            position: new Vector3(x, y, z),
        });
        cupBody.addShape(cupShape);
        cupBody.linearDamping = 0.1;
        this.parent.world.addBody(cupBody);
        this.body = cupBody;

        const insideShape = new Cylinder(0.285, 0.285, 0.005, 32, 32);

        //cupBody.addShape(insideShape);
        // const insideBody = new Body({
        //     mass: 10,
        //     //material: this.parent.groundMaterial,
        //     position: new Vector3(x, 4, z),
        //     isTrigger: true,
        // })
        // insideBody.addShape(insideShape);
        // insideBody.linearDamping = 0.1;
        // this.parent.world.addBody(insideBody);
        // insideBody.addEventListener('collide', this.handleCollision);
        // this.insideBody = insideBody;
        //const boxShape = new Box(new Vector3(2, 2, 5))
        console.log(cupShape.height);
        const triggerBody = new Body();
        triggerBody.addShape(insideShape);
        triggerBody.position.set(1, 0.3, 1);
        this.parent.world.addBody(triggerBody);
        this.insideBody = triggerBody;

        triggerBody.addEventListener('collide', (event) => {
              console.log(event.body.shapes[0]);
              console.log(event.body.shapes[0] == Sphere);
        });
    }

    initMesh(){
        const cupGeometry = new CylinderGeometry(0.3, 0.2, 0.8, 32, 32, false);
        const cupMaterial = new MeshStandardMaterial();
        const cupMesh = new Mesh(cupGeometry, cupMaterial);
        this.add(cupMesh);
        cupMesh.position.copy(this.body.position);
        this.mesh = cupMesh;


        const insideGeometry = new CylinderGeometry(0.285, 0.285, 0.005, 32, 32, false);
        const insideMaterial = new MeshBasicMaterial();
        const insideMesh = new Mesh(insideGeometry, insideMaterial);
        this.add(insideMesh);
        insideMesh.position.copy(this.insideBody.position);
        this.insideMesh = insideMesh;
    }

    handleCollision(event) {
        console.log('hit');
    }


    update(timeStamp) {
        //console.log(this.body.position);
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
        this.state.previous = this.body.position.clone();

        this.insideMesh.position.copy(this.insideBody.position);
        this.insideMesh.quaternion.copy(this.insideBody.quaternion);
    }
}

export default Cup;
