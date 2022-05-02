import {
    Group,
    Vector3,
    TextureLoader,
    SphereGeometry,
    MeshStandardMaterial,
    Mesh,
} from 'three';
import { Sphere, Body } from 'cannon';
import { MeshBasicMaterial } from 'three';

class Ball extends Group {
    constructor(parent, power, shootDirection) {
        super();
        this.parent = parent;

        // Initialize state and ball properties
        this.state = {
            power: power,
            shootDirection: shootDirection,
        };

        // Handles Collisions
        this.initBody();

        // Creates the golf ball with bump mapping
        this.initMesh();

        // For animating the golf ball projectile motion
        parent.addToUpdateList(this);
    }

    initBody() {
        const mass = 0.5;
        const radius = 0.125;
        let sphereShape = new Sphere(radius);
        let sphereBody = new Body({ mass: mass });
        sphereBody.addShape(sphereShape);
        sphereBody.position.set(0, 0.25, -7);
        sphereBody.linearDamping = 0.1;
        this.parent.world.add(sphereBody);
        this.body = sphereBody;
    }

    initMesh() {
        const segmentSize = 32;
        const ballGeometry = new SphereGeometry(
            0.125,
            segmentSize,
            segmentSize
        );
        const ballMaterial = new MeshBasicMaterial();
        const ballMesh = new Mesh(ballGeometry, ballMaterial);
        this.add(ballMesh);
        this.mesh = ballMesh;
        this.body.material = ballMaterial;
    }

    // Update ball mesh
    update() {
        this.mesh.position.copy(this.body.position);
        this.mesh.position.y -= 0.125;
        this.mesh.quaternion.copy(this.body.quaternion);
        this.state.previous = this.body.position.clone();
    }

    // Add a shooting force to the ball with the given power and direction
    /*
    Adapted From: 
    */
    shootBall() {
        const shootDirection = this.state.shootDirection;
        const power = this.state.power;
        this.body.velocity.set(
            shootDirection.x * power,
            (shootDirection.y + 1) * power,
            shootDirection.z * power
        );
    }
}

export default Ball;