import {
    Group,
    Box3,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    ConeGeometry,
    Vector3,
} from 'three';

class Arrow extends Group {
    constructor(parent, ballPos) {
        super();
        this.parent = parent;
        this.ballPos = ballPos;

        // Initialize state
        this.state = {};

        // Create the mesh for the arrow
        this.setupArrowMesh();
    }

    setupArrowMesh() {
        // Create a box
        var geometry = new BoxGeometry(0.25, 0.25, 1);
        var material = new MeshBasicMaterial({ color: 0xffffff });
        var cube = new Mesh(geometry, material);
        cube.position.set(this.ballPos.x, this.ballPos.y, this.ballPos.z);
        this.cube = cube;
        this.add(cube);

        // Create pyramid
        const radius = 0.25;
        const height = 0.5;
        const radialSegments = 32;
        var geometryPyramid = new ConeGeometry(radius, height, radialSegments);
        var cone = new Mesh(geometryPyramid, material);
        cone.rotation.x = Math.PI / 2;
        cone.position.set(
            this.ballPos.x,
            this.ballPos.y,
            this.ballPos.z + 0.75
        );
        this.cone = cone;
        this.add(cone);

        let pivot = new Group();
        this.pivot = pivot;
        pivot.position.set(
            this.ballPos.x,
            this.ballPos.y + 0.25,
            this.ballPos.z - 7
        );
        this.add(pivot);
        pivot.add(cube);
        pivot.add(cone);
    }

    updateShotDirectionPower(axis, angle) {
        // Change the arrow
        // this.pivot.remove(this.cube);
        // this.pivot.remove(this.cone);
        // this.show();
        // this.pivot.add(this.cube);
        // this.pivot.add(this.cone);

        this.pivot.rotation.y += angle;
    }

    show() {
        // Show the arrow
        this.visible = true;
    }

    hide() {
        // Hide the arrow
        this.visible = false;
    }
}

export default Arrow;