import { Group, Vector3, RectAreaLight } from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

class StripLights extends Group {
    constructor(parent) {
        // Invoke parent Group() constructor with our args
        super(parent);

        this.state = {
            gui: parent.state.gui,
            rerack_yellow: false,
        };

        const wide_scale = 0.5;
        const long_scale = 0.1;
        const x_pos = 0;
        const y_pos = 0;
        const z_pos = -5;
        const pos_scale_x = 0.65;
        const pos_scale_y = 1;
        const pos_scale_z = 1.1;

        //two longest green lights

        let longestGreen = new RectAreaLight(0x00ff00, 5, 3 * wide_scale, long_scale);
        longestGreen.position.set(-2, 0, -4);
        longestGreen.lookAt(-2, 2, -4);
        let helper = new RectAreaLightHelper(longestGreen);
        longestGreen.add(helper);
        this.add(longestGreen);

        parent.addToUpdateList(this);
    }

    update(timeStamp) {

    }
}

export default StripLights;
