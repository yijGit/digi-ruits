import { Group, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './cup.gltf';

class Cup extends Group {
    constructor(x,z) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.scale.x = 0.1;
        this.scale.y = 0.1;
        this.scale.z = 0.1;

        var bbox = new Box3().setFromObject(this);
        this.position.y = -0.5;
        this.position.x = x;
        this.position.z = z;

        this.name = 'cup';

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });
    }
}

export default Cup;
