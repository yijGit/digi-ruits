import { Group, Vector3, RectAreaLight } from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

class CupLightsYellow extends Group {
    constructor(parent) {
        // Invoke parent Group() constructor with our args
        super(parent);

        this.state = {
            gui: parent.state.gui,
            rerack_yellow: false,
        };

        this.parent = parent;
        const scale = 0.5;
        const x_pos = 0;
        const y_pos = 0;
        const z_pos = -5;
        const pos_scale_x = 0.65;
        const pos_scale_y = 1;
        const pos_scale_z = 1.1;

        let lightList = [];
        //first row, blue side
        lightList.push(new Vector3((-3 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (10 + z_pos) * pos_scale_z));
        lightList.push(new Vector3((-2 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (10 + z_pos) * pos_scale_z));
        lightList.push(new Vector3((-1 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (10 + z_pos) * pos_scale_z));
        lightList.push(new Vector3((0 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (10 + z_pos) * pos_scale_z));
        lightList.push(new Vector3((1 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (10 + z_pos) * pos_scale_z));
        lightList.push(new Vector3((2 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (10 + z_pos) * pos_scale_z));
        lightList.push(new Vector3((3 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (10 + z_pos) * pos_scale_z));

        //second row, yellow side
        lightList.push(new Vector3((-2.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9.5 + z_pos) * pos_scale_z));
        lightList.push(new Vector3((-1.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9.5 + z_pos) * pos_scale_z));
        lightList.push(new Vector3((-0.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9.5 + z_pos) * pos_scale_z));
        lightList.push(new Vector3((0.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9.5 + z_pos) * pos_scale_z));
        lightList.push(new Vector3((1.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9.5 + z_pos) * pos_scale_z));
        lightList.push(new Vector3((2.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9.5 + z_pos) * pos_scale_z));

        //third row, yellow side
        lightList.push(new Vector3((-2 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9 + z_pos) * pos_scale_z));
        lightList.push(new Vector3((0 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9 + z_pos) * pos_scale_z));
        lightList.push(new Vector3((2 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9 + z_pos) * pos_scale_z));

        for (let i = 0; i < lightList.length; i++) {
            let light = new RectAreaLight(0x0ffff00, 5, scale, scale);
            light.position.set(lightList[i].x, lightList[i].y, lightList[i].z);
            light.lookAt(lightList[i].x, lightList[i].y + 2, lightList[i].z);
            let helper = new RectAreaLightHelper(light);
            light.add(helper);
            this.add(light);
        }
        parent.addToUpdateList(this);

        //populate GUI
        this.state.gui.add(this.state, 'rerack_yellow');
    }

    update(timeStamp) {
        let rerack = [2, 3, 4, 9, 10, 14];
        let twoRacks = [0, 1, 2, 4, 5, 6, 7, 8, 11, 12, 13, 15];
        if (this.state.rerack_yellow) {
            this.parent.state.rerack_yellow = true;
            //if rerack, only the 6 lights in the middle should be on
            //console.log(this.children);
            for (let i = 0; i < 16; i++) {
                if (rerack.includes(i)) {
                    this.children[i].position.y = -0.5;
                }
                else {
                    this.children[i].position.y = 5000;
                }

            }
        }
        else {
            this.parent.state.rerack_yellow = false;
            for (let i = 0; i < 16; i++) {
                if (twoRacks.includes(i)) {
                    this.children[i].position.y = -0.5;
                }
                else {
                    this.children[i].position.y = 5000;
                }

            }

        }
    }
}

export default CupLightsYellow;
