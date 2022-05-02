import { Vec3 } from 'cannon';
import { Group, Vector3, RectAreaLight } from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

class StripLightsBlue extends Group {
    constructor(parent) {
        // Invoke parent Group() constructor with our args
        super(parent);

        this.state = {
            gui: parent.state.gui,
            rerack_yellow: false,
        };

        const wide_scale = 0.5;
        const long_scale = 0.1;

        //two longest blue lights
        let blue = new RectAreaLight(0x0033ff, 5, 3.5 * wide_scale, long_scale);
        blue.position.set(1.4, -0.5, -3.1 + (-2 * 0.25));
        blue.lookAt(1.4, 2, -3.1 + (-2 * 0.25));
        let helper = new RectAreaLightHelper(blue);
        blue.add(helper);
        this.add(blue);

        let blue_2 = new RectAreaLight(0x0033ff, 5, 3.5 * wide_scale, long_scale);
        blue_2.position.set(1.4, -0.5, -3.1 + (-1 * 0.25));
        blue_2.lookAt(1.4, 2, -3.1 + (-1 * 0.25));
        let helper_2 = new RectAreaLightHelper(blue_2);
        blue_2.add(helper_2);
        this.add(blue_2);

        //three slightly shorter blue lights
        let blue_3 = new RectAreaLight(0x0033ff, 5, 3 * wide_scale, long_scale);
        blue_3.position.set((1.4 + 0.125), -0.5, -3.1 + (0 * 0.25));
        blue_3.lookAt((1.4 + 0.125), 2, -3.1 + (0 * 0.25));
        let helper_3 = new RectAreaLightHelper(blue_3);
        blue_3.add(helper_3);
        this.add(blue_3);

        let blue_4 = new RectAreaLight(0x0033ff, 5, 3 * wide_scale, long_scale);
        blue_4.position.set((1.4 + 0.125), -0.5, -3.1 + (1 * 0.25));
        blue_4.lookAt((1.4 + 0.125), 2, -3.1 + (1 * 0.25));
        let helper_4 = new RectAreaLightHelper(blue_4);
        blue_4.add(helper_4);
        this.add(blue_4);

        let blue_5 = new RectAreaLight(0x0033ff, 5, 3 * wide_scale, long_scale);
        blue_5.position.set((1.4 + 0.125), -0.5, -3.1 + (2 * 0.25));
        blue_5.lookAt((1.4 + 0.125), 2, -3.1 + (2 * 0.25));
        let helper_5 = new RectAreaLightHelper(blue_5);
        blue_5.add(helper_5);
        this.add(blue_5);

        //three slightly shorter blue lights
        let blue_6 = new RectAreaLight(0x0033ff, 5, 2.5 * wide_scale, long_scale);
        blue_6.position.set((1.4 + 0.25), -0.5, -3.1 + (3 * 0.25));
        blue_6.lookAt((1.4 + 0.25), 2, -3.1 + (3 * 0.25));
        let helper_6 = new RectAreaLightHelper(blue_6);
        blue_6.add(helper_6);
        this.add(blue_6);

        let blue_7 = new RectAreaLight(0x0033ff, 5, 2.5 * wide_scale, long_scale);
        blue_7.position.set((1.4 + 0.25), -0.5, -3.1 + (4 * 0.25));
        blue_7.lookAt((1.4 + 0.25), 2, -3.1 + (4 * 0.25));
        let helper_7 = new RectAreaLightHelper(blue_7);
        blue_7.add(helper_7);
        this.add(blue_7);

        let blue_8 = new RectAreaLight(0x0033ff, 5, 2.5 * wide_scale, long_scale);
        blue_8.position.set((1.4 + 0.25), -0.5, -3.1 + (5 * 0.25));
        blue_8.lookAt((1.4 + 0.25), 2, -3.1 + (5 * 0.25));
        let helper_8 = new RectAreaLightHelper(blue_8);
        blue_8.add(helper_8);
        this.add(blue_8);

        //three slightly shorter blue lights
        let blue_9 = new RectAreaLight(0x0033ff, 5, 2 * wide_scale, long_scale);
        blue_9.position.set((1.4 + 0.375), -0.5, -3.1 + (6 * 0.25));
        blue_9.lookAt((1.4 + 0.375), 2, -3.1 + (6 * 0.25));
        let helper_9 = new RectAreaLightHelper(blue_9);
        blue_9.add(helper_9);
        this.add(blue_9);

        let blue_10 = new RectAreaLight(0x0033ff, 5, 2 * wide_scale, long_scale);
        blue_10.position.set((1.4 + 0.375), -0.5, -3.1 + (7 * 0.25));
        blue_10.lookAt((1.4 + 0.375), 2, -3.1 + (7 * 0.25));
        let helper_10 = new RectAreaLightHelper(blue_10);
        blue_10.add(helper_10);
        this.add(blue_10);

        let blue_11 = new RectAreaLight(0x0033ff, 5, 2 * wide_scale, long_scale);
        blue_11.position.set((1.4 + 0.375), -0.5, -3.1 + (8 * 0.25));
        blue_11.lookAt((1.4 + 0.375), 2, -3.1 + (8 * 0.25));
        let helper_11 = new RectAreaLightHelper(blue_11);
        blue_11.add(helper_11);
        this.add(blue_11);

        //two shortest blue lights
        let blue_12 = new RectAreaLight(0x0033ff, 5, 1.5 * wide_scale, long_scale);
        blue_12.position.set((1.4 + 0.5), -0.5, -3.1 + (9 * 0.25));
        blue_12.lookAt((1.4 + 0.5), 2, -3.1 + (9 * 0.25));
        let helper_12 = new RectAreaLightHelper(blue_12);
        blue_12.add(helper_12);
        this.add(blue_12);

        let blue_13 = new RectAreaLight(0x0033ff, 5, 1.5 * wide_scale, long_scale);
        blue_13.position.set((1.4 + 0.5), -0.5, -3.1 + (10 * 0.25));
        blue_13.lookAt((1.4 + 0.5), 2, -3.1 + (10 * 0.25));
        let helper_13 = new RectAreaLightHelper(blue_13);
        blue_13.add(helper_13);
        this.add(blue_13);

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

export default StripLightsBlue;
