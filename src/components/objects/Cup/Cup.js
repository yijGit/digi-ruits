import {
    Group, Box3,
    Vector3,
    TextureLoader,
    SphereGeometry,
    MeshStandardMaterial,
    Mesh, MeshBasicMaterial, CylinderGeometry
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './cup.gltf';
import { Sphere, Box, Cylinder, Body, Shape, ConvexPolyhedron, ContactMaterial } from 'cannon';

class Cup extends Group {
    constructor(parent, x, z) {
        // Call parent Group() constructor
        super();
        this.parent = parent;

        this.state = {
            previous: new Vector3(),
        };

        const loader = new GLTFLoader();

        //this.scale.x = 0.1;
        //this.scale.y = 0.1;
        //this.scale.z = 0.1;

        this.position.x = x;
        this.position.z = z;

        this.name = 'cup';

        //loader.load(MODEL, (gltf) => {
           // this.add(gltf.scene);
       // });

        this.initBody(x, z);
        this.initMesh();

        //add cup to parent update list
        parent.addToUpdateList(this);
    }

    initBody(x, z) {
        var cupShape = new Cylinder(1, 1,2,100);
        var cupBody = new Body({mass: 10});
        cupBody.addShape(cupShape);
        cupBody.position.set(x, 2, z);
        cupBody.linearDamping = 0.1;
        this.parent.world.add(cupBody);
        this.body = cupBody;
    }

    initMesh(){
        const cylinderGeometry = new CylinderGeometry(1, 1,2,100,100);
        const cupMaterial = new MeshBasicMaterial();
        const cupMesh = new Mesh(cylinderGeometry, cupMaterial);
        this.add(cupMesh);
        this.mesh = cupMesh;
        this.body.material = cupMaterial;
    }

    update(timeStamp) {
        //console.log(this.body.position);
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
        this.state.previous = this.body.position.clone();
    }
}

export default Cup;
