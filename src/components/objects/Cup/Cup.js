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
        this.name = "cup";

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
        cupBody.addEventListener('collide', function (e) {
            if (e.body.name == "ball") {
                console.log('hit');
                //actions for if it is high enough
                console.log(e.body.position.y);
                if (e.body.position.y > 0.3) {
                    var dist = Math.pow(e.body.position.z - this.position.z, 2) + Math.pow(e.body.position.x - this.position.x, 2);
                    if (dist < (0.3 * 0.3)) {
                        console.log('success');
                        //initiate cup and ball delete
                        this.parent.parent.parent.state.ball_needs_delete = true;
                        this.parent.parent.parent.state.cup_needs_delete = true;
                        this.parent.parent.parent.state.cup_to_delete.push(this.parent);
                    }
                }
            }
        });
        this.body = cupBody;
        this.body.name = "cup";
        this.body.parent = this;
    }

    initMesh() {
        const cupGeometry = new CylinderGeometry(0.3, 0.2, 0.8, 32, 32, false);
        const cupMaterial = new MeshStandardMaterial();
        const cupMesh = new Mesh(cupGeometry, cupMaterial);
        this.add(cupMesh);
        cupMesh.position.copy(this.body.position);
        this.mesh = cupMesh;
    }

    // handleCollision(e) {
    //     if(e.body.name == "ball") 
    //     console.log('hit');
    // }

    selfDestruct() {
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
        this.position.x = 10000;
    }

    update(timeStamp) {
        //console.log(this.body.position);
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
        this.state.previous = this.body.position.clone();
    }
}

export default Cup;
