import {
    Group,
    Box3,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    ConeGeometry,
    Vector3,
    MeshNormalMaterial,
} from 'three';

// Adapted from Bucketball - Labib Hussain and Emre Cakir
class Arrow extends Group {
    constructor(parent, pos) {
        super();
        this.parent = parent;
        this.pos = pos;

        // Initialize state
        this.state = {};

        // Create the mesh for the arrow
        this.setupArrowMesh();
    }

    setupArrowMesh() {
        // Create a box
        const geometry = new BoxGeometry(0.25, 0.25, 1);
        const material = new MeshNormalMaterial({ color: 0xffffff });
        const cube = new Mesh(geometry, material);
        this.cube = cube;
        this.add(cube);

        // Create pyramid
        const radius = 0.25;
        const height = 0.5;
        const radialSegments = 32;
        const geometryPyramid = new ConeGeometry(radius, height, radialSegments);
        const cone = new Mesh(geometryPyramid, material);
        cone.rotation.x = Math.PI / 2;
        cone.position.set(0, 0, 0.75);
        this.cone = cone;
        this.add(cone);

        const pivot = new Group();
        this.pivot = pivot;
        pivot.position.set(this.pos.x, this.pos.y, this.pos.z);
        console.log(this.pos);
        console.log(pivot.position);
        pivot.lookAt(this.parent.state.shootDirection);
        this.add(pivot);
        pivot.add(cube);
        pivot.add(cone);
    }

    updateShotRotate(angle) {
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