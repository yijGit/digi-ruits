import { Vec3 } from 'cannon-es';
import { Group, Vector3, RectAreaLight } from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

class StripLightsRed extends Group {
    constructor(parent) {
        // Invoke parent Group() constructor with our args
        super(parent);

        this.state = {
            gui: parent.state.gui,
            rerack_yellow: false,
        };

        const wide_scale = 0.5;
        const long_scale = 0.1;

        //two longest red lights
        let red = new RectAreaLight(0xff0000, 5, 3.5 * wide_scale, long_scale);
        red.position.set(1.4, -0.5, 3.1 +(-2 * -0.25));
        red.lookAt(1.4, 2, 3.1 +(-2 * -0.25));
        let helper = new RectAreaLightHelper(red);
        red.add(helper);
        this.add(red);

        let red_2 = new RectAreaLight(0xff0000, 5, 3.5 * wide_scale, long_scale);
        red_2.position.set(1.4, -0.5, 3.1 +(-1 * -0.25));
        red_2.lookAt(1.4, 2, 3.1 +(-1 * -0.25));
        let helper_2 = new RectAreaLightHelper(red_2);
        red_2.add(helper_2);
        this.add(red_2);

        //three slightly shorter red lights
        let red_3 = new RectAreaLight(0xff0000, 5, 3 * wide_scale, long_scale);
        red_3.position.set((1.4 + 0.125), -0.5, 3.1 +(0 * -0.25));
        red_3.lookAt((1.4 + 0.125), 2, 3.1 +(0 * -0.25));
        let helper_3 = new RectAreaLightHelper(red_3);
        red_3.add(helper_3);
        this.add(red_3);

        let red_4 = new RectAreaLight(0xff0000, 5, 3 * wide_scale, long_scale);
        red_4.position.set((1.4 + 0.125), -0.5, 3.1 +(1 * -0.25));
        red_4.lookAt((1.4 + 0.125), 2, 3.1 +(1 * -0.25));
        let helper_4 = new RectAreaLightHelper(red_4);
        red_4.add(helper_4);
        this.add(red_4);

        let red_5 = new RectAreaLight(0xff0000, 5, 3 * wide_scale, long_scale);
        red_5.position.set((1.4 + 0.125), -0.5, 3.1 +(2 * -0.25));
        red_5.lookAt((1.4 + 0.125), 2, 3.1 +(2 * -0.25));
        let helper_5 = new RectAreaLightHelper(red_5);
        red_5.add(helper_5);
        this.add(red_5);

        //three slightly shorter red lights
        let red_6 = new RectAreaLight(0xff0000, 5, 2.5 * wide_scale, long_scale);
        red_6.position.set((1.4 + 0.25), -0.5, 3.1 +(3 * -0.25));
        red_6.lookAt((1.4 + 0.25), 2, 3.1 +(3 * -0.25));
        let helper_6 = new RectAreaLightHelper(red_6);
        red_6.add(helper_6);
        this.add(red_6);

        let red_7 = new RectAreaLight(0xff0000, 5, 2.5 * wide_scale, long_scale);
        red_7.position.set((1.4 + 0.25), -0.5, 3.1 +(4 * -0.25));
        red_7.lookAt((1.4 + 0.25), 2, 3.1 +(4 * -0.25));
        let helper_7 = new RectAreaLightHelper(red_7);
        red_7.add(helper_7);
        this.add(red_7);

        let red_8 = new RectAreaLight(0xff0000, 5, 2.5 * wide_scale, long_scale);
        red_8.position.set((1.4 + 0.25), -0.5, 3.1 +(5 * -0.25));
        red_8.lookAt((1.4 + 0.25), 2, 3.1 +(5 * -0.25));
        let helper_8 = new RectAreaLightHelper(red_8);
        red_8.add(helper_8);
        this.add(red_8);

        //three slightly shorter red lights
        let red_9 = new RectAreaLight(0xff0000, 5, 2 * wide_scale, long_scale);
        red_9.position.set((1.4 + 0.375), -0.5, 3.1 +(6 * -0.25));
        red_9.lookAt((1.4 + 0.375), 2, 3.1 +(6 * -0.25));
        let helper_9 = new RectAreaLightHelper(red_9);
        red_9.add(helper_9);
        this.add(red_9);

        let red_10 = new RectAreaLight(0xff0000, 5, 2 * wide_scale, long_scale);
        red_10.position.set((1.4 + 0.375), -0.5, 3.1 +(7 * -0.25));
        red_10.lookAt((1.4 + 0.375), 2, 3.1 +(7 * -0.25));
        let helper_10 = new RectAreaLightHelper(red_10);
        red_10.add(helper_10);
        this.add(red_10);

        let red_11 = new RectAreaLight(0xff0000, 5, 2 * wide_scale, long_scale);
        red_11.position.set((1.4 + 0.375), -0.5, 3.1 +(8 * -0.25));
        red_11.lookAt((1.4 + 0.375), 2, 3.1 +(8 * -0.25));
        let helper_11 = new RectAreaLightHelper(red_11);
        red_11.add(helper_11);
        this.add(red_11);

        //two shortest red lights
        let red_12 = new RectAreaLight(0xff0000, 5, 1.5 * wide_scale, long_scale);
        red_12.position.set((1.4 + 0.5), -0.5, 3.1 +(9 * -0.25));
        red_12.lookAt((1.4 + 0.5), 2, 3.1 +(9 * -0.25));
        let helper_12 = new RectAreaLightHelper(red_12);
        red_12.add(helper_12);
        this.add(red_12);

        let red_13 = new RectAreaLight(0xff0000, 5, 1.5 * wide_scale, long_scale);
        red_13.position.set((1.4 + 0.5), -0.5, 3.1 +(10 * -0.25));
        red_13.lookAt((1.4 + 0.5), 2, 3.1 +(10 * -0.25));
        let helper_13 = new RectAreaLightHelper(red_13);
        red_13.add(helper_13);
        this.add(red_13);

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

export default StripLightsRed;
