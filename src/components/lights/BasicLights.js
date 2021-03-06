import { Group, SpotLight, AmbientLight, HemisphereLight, Vector3, RectAreaLight } from 'three';

class BasicLights extends Group {
    constructor(...args) {
        // Invoke parent Group() constructor with our args
        super(...args);

        const dir = new SpotLight(0xffffff, 1.6, 7, 0.8, 1, 0.5);
        const ambi = new AmbientLight(0x404040, 0.5);
        const hemi = new HemisphereLight(0xffffbb, 0x080820, 0.5);

        dir.position.set(5, 1, 2);
        dir.target.position.set(0, 0, 0);

        this.add(ambi, hemi, dir);
    }
}

export default BasicLights;
