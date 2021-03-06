import { BlendingEquation, Group, Vector3 } from 'three';
import { Cup } from 'objects';

class Rack extends Group {
    constructor(parent, side) {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            gui: parent.state.gui,
            noCups: 12,
            rerack: false,
        };

        //add all of the cups

        const x_pos = 0;
        const y_pos = 0;
        const z_pos = -5;
        const pos_scale_x = 0.65;
        const pos_scale_y = 1;
        const pos_scale_z = 1.1;

        var list = []
        //first row, blue side
        list.push(new Vector3((-3 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (0 + z_pos) * pos_scale_z));
        list.push(new Vector3((-2 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (0 + z_pos) * pos_scale_z));
        list.push(new Vector3((-1 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (0 + z_pos) * pos_scale_z));
        list.push(new Vector3((0 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (0 + z_pos) * pos_scale_z));
        list.push(new Vector3((1 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (0 + z_pos) * pos_scale_z));
        list.push(new Vector3((2 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (0 + z_pos) * pos_scale_z));
        list.push(new Vector3((3 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (0 + z_pos) * pos_scale_z));

        //second row, blue side
        list.push(new Vector3((-2.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (0.5 + z_pos) * pos_scale_z));
        list.push(new Vector3((-1.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (0.5 + z_pos) * pos_scale_z));
        list.push(new Vector3((-0.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (0.5 + z_pos) * pos_scale_z));
        list.push(new Vector3((0.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (0.5 + z_pos) * pos_scale_z));
        list.push(new Vector3((1.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (0.5 + z_pos) * pos_scale_z));
        list.push(new Vector3((2.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (0.5 + z_pos) * pos_scale_z));

        //third row, blue side
        list.push(new Vector3((-2 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (1 + z_pos) * pos_scale_z));
        list.push(new Vector3((0 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (1 + z_pos) * pos_scale_z));
        list.push(new Vector3((2 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (1 + z_pos) * pos_scale_z));

        //first row, yellow side4
        list.push(new Vector3((-3 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (10 + z_pos) * pos_scale_z));
        list.push(new Vector3((-2 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (10 + z_pos) * pos_scale_z));
        list.push(new Vector3((-1 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (10 + z_pos) * pos_scale_z));
        list.push(new Vector3((0 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (10 + z_pos) * pos_scale_z));
        list.push(new Vector3((1 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (10 + z_pos) * pos_scale_z));
        list.push(new Vector3((2 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (10 + z_pos) * pos_scale_z));
        list.push(new Vector3((3 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (10 + z_pos) * pos_scale_z));

        //second row, yellow side
        list.push(new Vector3((-2.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9.5 + z_pos) * pos_scale_z));
        list.push(new Vector3((-1.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9.5 + z_pos) * pos_scale_z));
        list.push(new Vector3((-0.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9.5 + z_pos) * pos_scale_z));
        list.push(new Vector3((0.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9.5 + z_pos) * pos_scale_z));
        list.push(new Vector3((1.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9.5 + z_pos) * pos_scale_z));
        list.push(new Vector3((2.5 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9.5 + z_pos) * pos_scale_z));

        //third row, yellow side
        list.push(new Vector3((-2 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9 + z_pos) * pos_scale_z));
        list.push(new Vector3((0 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9 + z_pos) * pos_scale_z));
        list.push(new Vector3((2 + x_pos) * pos_scale_x, (0 + y_pos) * pos_scale_y, (9 + z_pos) * pos_scale_z));

        let twoRacks = [0, 1, 2, 4, 5, 6, 7, 8, 11, 12, 13, 15];
        if (side == 0) {
            this.name = "blue_rack";
            for (let i = 0; i < 16; i++) {
                if (twoRacks.includes(i)) {
                    let cup = new Cup(parent, list[i].x, 0.4, list[i].z, "blue");
                    this.add(cup);
                }
            }
        }
        else {
            this.name = "yellow_rack";
            for (let i = 0; i < 16; i++) {
                if (twoRacks.includes(i)) {
                    let cup = new Cup(parent, list[16 + i].x, 0.4, list[16 + i].z, "yellow");
                    this.add(cup);
                }
            }
        }
        parent.addToUpdateList(this);
    }

    update(timeStamp) {

    }
}

export default Rack;
