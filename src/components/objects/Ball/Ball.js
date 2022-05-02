import {
    Group,
    Vector3,
    TextureLoader,
    SphereGeometry,
    MeshStandardMaterial,
    Mesh,
} from 'three';
import { Sphere, Body } from 'cannon-es';
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
        const sphereShape = new Sphere(radius);
        const sphereBody = new Body({ 
            mass: mass,
            material: this.parent.bounceMaterial,
            position: new Vector3(0, 0, -7)
         });
        sphereBody.addShape(sphereShape);
        //sphereBody.position.set(0, 0, -7);
        sphereBody.linearDamping = 0.1;
        this.parent.world.addBody(sphereBody);
        this.body = sphereBody;
    }

    initMesh() {
        const segmentSize = 32;
        const ballGeometry = new SphereGeometry(
            0.125,
            segmentSize,
            segmentSize
        );
        const ballMaterial = new MeshStandardMaterial();
        const ballMesh = new Mesh(ballGeometry, ballMaterial);
        this.add(ballMesh);
        ballMesh.position.copy(this.body.position);
        this.mesh = ballMesh;
    }

    // Update ball mesh
    update() {
        this.mesh.position.copy(this.body.position);
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