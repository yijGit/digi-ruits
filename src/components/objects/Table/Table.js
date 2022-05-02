import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Box, Body } from 'cannon-es';
import MODEL from './table.gltf';

class Table extends Group {
    constructor(parent, dim, pos) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
        });
        
        const table_scale = 6;
        this.scale.x = table_scale;
        this.scale.y = table_scale;
        this.scale.z = table_scale;

        this.position.y = -2.5
        this.name = "table";
        this.parent = parent;

        this.initBody(dim, pos);
    }

    initBody(dim, pos) {
        const tableShape = new Box(dim);
        const tableBody = new Body({
            mass: 0, 
            material: this.parent.groundMaterial
        });
        tableBody.addShape(tableShape);
        tableBody.position.set(pos.x, pos.y, pos.z);
        this.parent.world.addBody(tableBody);
        this.body = tableBody;
    }
}

export default Table;
