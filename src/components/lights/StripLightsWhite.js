import { Vec3 } from 'cannon';
import { Group, Vector3, RectAreaLight } from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';

class StripLightsWhite extends Group {
    constructor(parent) {
        // Invoke parent Group() constructor with our args
        super(parent);

        this.state = {
            gui: parent.state.gui,
            rerack_yellow: false,
        };

        const wide_scale = 0.5;
        const long_scale = 0.1;

        //two longest white lights
        let white = new RectAreaLight(0xffffcc, 5, 3.5 * wide_scale, long_scale);
        white.position.set(-1.4, -0.5, 3.1 + (-2 * -0.25));
        white.lookAt(-1.4, 2, 3.1 + (-2 * -0.25));
        let helper = new RectAreaLightHelper(white);
        white.add(helper);
        this.add(white);

        let white_2 = new RectAreaLight(0xffffcc, 5, 3.5 * wide_scale, long_scale);
        white_2.position.set(-1.4, -0.5, 3.1 + (-1 * -0.25));
        white_2.lookAt(-1.4, 2, 3.1 + (-1 * -0.25));
        let helper_2 = new RectAreaLightHelper(white_2);
        white_2.add(helper_2);
        this.add(white_2);

        //three slightly shorter white lights
        let white_3 = new RectAreaLight(0xffffcc, 5, 3 * wide_scale, long_scale);
        white_3.position.set((-1.4 - 0.125), -0.5, 3.1 + (0 * -0.25));
        white_3.lookAt((-1.4 - 0.125), 2, 3.1 + (0 * -0.25));
        let helper_3 = new RectAreaLightHelper(white_3);
        white_3.add(helper_3);
        this.add(white_3);

        let white_4 = new RectAreaLight(0xffffcc, 5, 3 * wide_scale, long_scale);
        white_4.position.set((-1.4 - 0.125), -0.5, 3.1 + (1 * -0.25));
        white_4.lookAt((-1.4 - 0.125), 2, 3.1 + (1 * -0.25));
        let helper_4 = new RectAreaLightHelper(white_4);
        white_4.add(helper_4);
        this.add(white_4);

        let white_5 = new RectAreaLight(0xffffcc, 5, 3 * wide_scale, long_scale);
        white_5.position.set((-1.4 - 0.125), -0.5, 3.1 + (2 * -0.25));
        white_5.lookAt((-1.4 - 0.125), 2, 3.1 + (2 * -0.25));
        let helper_5 = new RectAreaLightHelper(white_5);
        white_5.add(helper_5);
        this.add(white_5);

        //three slightly shorter white lights
        let white_6 = new RectAreaLight(0xffffcc, 5, 2.5 * wide_scale, long_scale);
        white_6.position.set((-1.4 - 0.25), -0.5, 3.1 + (3 * -0.25));
        white_6.lookAt((-1.4 - 0.25), 2, 3.1 + (3 * -0.25));
        let helper_6 = new RectAreaLightHelper(white_6);
        white_6.add(helper_6);
        this.add(white_6);

        let white_7 = new RectAreaLight(0xffffcc, 5, 2.5 * wide_scale, long_scale);
        white_7.position.set((-1.4 - 0.25), -0.5, 3.1 + (4 * -0.25));
        white_7.lookAt((-1.4 - 0.25), 2, 3.1 + (4 * -0.25));
        let helper_7 = new RectAreaLightHelper(white_7);
        white_7.add(helper_7);
        this.add(white_7);

        let white_8 = new RectAreaLight(0xffffcc, 5, 2.5 * wide_scale, long_scale);
        white_8.position.set((-1.4 - 0.25), -0.5, 3.1 + (5 * -0.25));
        white_8.lookAt((-1.4 - 0.25), 2, 3.1 + (5 * -0.25));
        let helper_8 = new RectAreaLightHelper(white_8);
        white_8.add(helper_8);
        this.add(white_8);

        //three slightly shorter white lights
        let white_9 = new RectAreaLight(0xffffcc, 5, 2 * wide_scale, long_scale);
        white_9.position.set((-1.4 - 0.375), -0.5, 3.1 + (6 * -0.25));
        white_9.lookAt((-1.4 - 0.375), 2, 3.1 + (6 * -0.25));
        let helper_9 = new RectAreaLightHelper(white_9);
        white_9.add(helper_9);
        this.add(white_9);

        let white_10 = new RectAreaLight(0xffffcc, 5, 2 * wide_scale, long_scale);
        white_10.position.set((-1.4 - 0.375), -0.5, 3.1 + (7 * -0.25));
        white_10.lookAt((-1.4 - 0.375), 2, 3.1 + (7 * -0.25));
        let helper_10 = new RectAreaLightHelper(white_10);
        white_10.add(helper_10);
        this.add(white_10);

        let white_11 = new RectAreaLight(0xffffcc, 5, 2 * wide_scale, long_scale);
        white_11.position.set((-1.4 - 0.375), -0.5, 3.1 + (8 * -0.25));
        white_11.lookAt((-1.4 - 0.375), 2, 3.1 + (8 * -0.25));
        let helper_11 = new RectAreaLightHelper(white_11);
        white_11.add(helper_11);
        this.add(white_11);

        //two shortest white lights
        let white_12 = new RectAreaLight(0xffffcc, 5, 1.5 * wide_scale, long_scale);
        white_12.position.set((-1.4 - 0.5), -0.5, 3.1 + (9 * -0.25));
        white_12.lookAt((-1.4 - 0.5), 2, 3.1 + (9 * -0.25));
        let helper_12 = new RectAreaLightHelper(white_12);
        white_12.add(helper_12);
        this.add(white_12);

        let white_13 = new RectAreaLight(0xffffcc, 5, 1.5 * wide_scale, long_scale);
        white_13.position.set((-1.4 - 0.5), -0.5, 3.1 + (10 * -0.25));
        white_13.lookAt((-1.4 - 0.5), 2, 3.1 + (10 * -0.25));
        let helper_13 = new RectAreaLightHelper(white_13);
        white_13.add(helper_13);
        this.add(white_13);

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

export default StripLightsWhite;
