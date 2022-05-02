import { Vec3 } from 'cannon-es';
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

        //two longest green lights
        let green = new RectAreaLight(0x00ff00, 5, 3.5 * wide_scale, long_scale);
        green.position.set(-1.4, -0.5, -3.1 + (-2 * 0.25));
        green.lookAt(-1.4, 2, -3.1 + (-2 * 0.25));
        let helper = new RectAreaLightHelper(green);
        green.add(helper);
        this.add(green);

        let green_2 = new RectAreaLight(0x00ff00, 5, 3.5 * wide_scale, long_scale);
        green_2.position.set(-1.4, -0.5, -3.1 + (-1 * 0.25));
        green_2.lookAt(-1.4, 2, -3.1 + (-1 * 0.25));
        let helper_2 = new RectAreaLightHelper(green_2);
        green_2.add(helper_2);
        this.add(green_2);

        //three slightly shorter green lights
        let green_3 = new RectAreaLight(0x00ff00, 5, 3 * wide_scale, long_scale);
        green_3.position.set((-1.4 - 0.125), -0.5, -3.1 + (0 * 0.25));
        green_3.lookAt((-1.4 - 0.125), 2, -3.1 + (0 * 0.25));
        let helper_3 = new RectAreaLightHelper(green_3);
        green_3.add(helper_3);
        this.add(green_3);

        let green_4 = new RectAreaLight(0x00ff00, 5, 3 * wide_scale, long_scale);
        green_4.position.set((-1.4 - 0.125), -0.5, -3.1 + (1 * 0.25));
        green_4.lookAt((-1.4 - 0.125), 2, -3.1 + (1 * 0.25));
        let helper_4 = new RectAreaLightHelper(green_4);
        green_4.add(helper_4);
        this.add(green_4);

        let green_5 = new RectAreaLight(0x00ff00, 5, 3 * wide_scale, long_scale);
        green_5.position.set((-1.4 - 0.125), -0.5, -3.1 + (2 * 0.25));
        green_5.lookAt((-1.4 - 0.125), 2, -3.1 + (2 * 0.25));
        let helper_5 = new RectAreaLightHelper(green_5);
        green_5.add(helper_5);
        this.add(green_5);

        //three slightly shorter green lights
        let green_6 = new RectAreaLight(0x00ff00, 5, 2.5 * wide_scale, long_scale);
        green_6.position.set((-1.4 - 0.25), -0.5, -3.1 + (3 * 0.25));
        green_6.lookAt((-1.4 - 0.25), 2, -3.1 + (3 * 0.25));
        let helper_6 = new RectAreaLightHelper(green_6);
        green_6.add(helper_6);
        this.add(green_6);

        let green_7 = new RectAreaLight(0x00ff00, 5, 2.5 * wide_scale, long_scale);
        green_7.position.set((-1.4 - 0.25), -0.5, -3.1 + (4 * 0.25));
        green_7.lookAt((-1.4 - 0.25), 2, -3.1 + (4 * 0.25));
        let helper_7 = new RectAreaLightHelper(green_7);
        green_7.add(helper_7);
        this.add(green_7);

        let green_8 = new RectAreaLight(0x00ff00, 5, 2.5 * wide_scale, long_scale);
        green_8.position.set((-1.4 - 0.25), -0.5, -3.1 + (5 * 0.25));
        green_8.lookAt((-1.4 - 0.25), 2, -3.1 + (5 * 0.25));
        let helper_8 = new RectAreaLightHelper(green_8);
        green_8.add(helper_8);
        this.add(green_8);

        //three slightly shorter green lights
        let green_9 = new RectAreaLight(0x00ff00, 5, 2 * wide_scale, long_scale);
        green_9.position.set((-1.4 - 0.375), -0.5, -3.1 + (6 * 0.25));
        green_9.lookAt((-1.4 - 0.375), 2, -3.1 + (6 * 0.25));
        let helper_9 = new RectAreaLightHelper(green_9);
        green_9.add(helper_9);
        this.add(green_9);

        let green_10 = new RectAreaLight(0x00ff00, 5, 2 * wide_scale, long_scale);
        green_10.position.set((-1.4 - 0.375), -0.5, -3.1 + (7 * 0.25));
        green_10.lookAt((-1.4 - 0.375), 2, -3.1 + (7 * 0.25));
        let helper_10 = new RectAreaLightHelper(green_10);
        green_10.add(helper_10);
        this.add(green_10);

        let green_11 = new RectAreaLight(0x00ff00, 5, 2 * wide_scale, long_scale);
        green_11.position.set((-1.4 - 0.375), -0.5, -3.1 + (8 * 0.25));
        green_11.lookAt((-1.4 - 0.375), 2, -3.1 + (8 * 0.25));
        let helper_11 = new RectAreaLightHelper(green_11);
        green_11.add(helper_11);
        this.add(green_11);

        //two shortest green lights
        let green_12 = new RectAreaLight(0x00ff00, 5, 1.5 * wide_scale, long_scale);
        green_12.position.set((-1.4 - 0.5), -0.5, -3.1 + (9 * 0.25));
        green_12.lookAt((-1.4 - 0.5), 2, -3.1 + (9 * 0.25));
        let helper_12 = new RectAreaLightHelper(green_12);
        green_12.add(helper_12);
        this.add(green_12);

        let green_13 = new RectAreaLight(0x00ff00, 5, 1.5 * wide_scale, long_scale);
        green_13.position.set((-1.4 - 0.5), -0.5, -3.1 + (10 * 0.25));
        green_13.lookAt((-1.4 - 0.5), 2, -3.1 + (10 * 0.25));
        let helper_13 = new RectAreaLightHelper(green_13);
        green_13.add(helper_13);
        this.add(green_13);

        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        if ((timeStamp % 5000) < 1000) {
            this.children[11].position.y = 5000;
            this.children[12].position.y = 5000;
            this.children[0].position.y = -0.5;
            this.children[1].position.y = -0.5;
            this.children[2].position.y = 5000;
            this.children[3].position.y = 5000;
            this.children[4].position.y = 5000;
            this.children[5].position.y = 5000;
            this.children[6].position.y = 5000;
            this.children[7].position.y = 5000;
            this.children[8].position.y = 5000;
            this.children[9].position.y = 5000;
            this.children[10].position.y = 5000;
            
        }
        else if ((timeStamp % 5000) < 2000) {
            this.children[0].position.y = 5000;
            this.children[1].position.y = 5000;
            this.children[2].position.y = -0.5;
            this.children[3].position.y = -0.5;
            this.children[4].position.y = -0.5;
            this.children[5].position.y = 5000;
            this.children[6].position.y = 5000;
            this.children[7].position.y = 5000;
        }
        else if ((timeStamp % 5000) < 3000) {
            this.children[2].position.y = 5000;
            this.children[3].position.y = 5000;
            this.children[4].position.y = 5000;
            this.children[5].position.y = -0.5;
            this.children[6].position.y = -0.5;
            this.children[7].position.y = -0.5;
            this.children[8].position.y = 5000;
            this.children[9].position.y = 5000;
            this.children[10].position.y = 5000;
        }
        else if ((timeStamp % 5000) < 4000) {
            this.children[5].position.y = 5000;
            this.children[6].position.y = 5000;
            this.children[7].position.y = 5000;
            this.children[8].position.y = -0.5;
            this.children[9].position.y = -0.5;
            this.children[10].position.y = -0.5;
            this.children[11].position.y = 5000;
            this.children[12].position.y = 5000;
        }
        else {
            this.children[8].position.y = 5000;
            this.children[9].position.y = 5000;
            this.children[10].position.y = 5000;
            this.children[11].position.y = -0.5;
            this.children[12].position.y = -0.5;
            this.children[0].position.y = 5000;
            this.children[1].position.y = 5000;
        }
    }
}

export default StripLights;
