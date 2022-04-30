import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './table.gltf';

class Table extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        let table_scale = 6;
        this.position.y = -2;
        this.scale.x = table_scale;
        this.scale.y = table_scale;
        this.scale.z = table_scale;

        this.position.y = -2.5;
        this.name = "table";

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });
    }
}

export default Table;
