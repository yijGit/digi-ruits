import * as Dat from 'dat.gui';
import { Scene, Color, Vector3 } from 'three';
import { BoxGeometry } from 'three';
import { MeshBasicMaterial } from 'three';
import { Mesh } from 'three';
//add mesh js files to import here
import { Flower, Land, Table, Cup } from 'objects';
import { BasicLights, CupLightsBlue, CupLightsYellow } from 'lights';
import { RectAreaLight } from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { Rack } from '../objects';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        //***NEEDS TO BE INCORPORATED INTO SCENE */
        const lights = new BasicLights();
        const blueLight = new CupLightsBlue(this);
        const yellowLight = new CupLightsYellow(this);
        const table = new Table();
        const blueRack = new Rack(this, 0);
        const yellowRack = new Rack(this, 1);

        this.add(blueLight);
        this.add(yellowLight);
        this.add(lights);
        this.add(blueRack);
        this.add(yellowRack);
        this.add(table);
        /* END SCENE INCORPORATION */

        // Populate GUI
        this.state.gui.add(this.state, 'rotationSpeed', 0, 0);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        // this.rotation.y = (0 * timeStamp) / 10000;
        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default SeedScene;
