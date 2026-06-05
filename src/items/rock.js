import { Projectile } from "./projectile.js";

export class Rock extends Projectile  {

    heldOffset = -14;
    isThrown = false;

    constructor(scene, x, y) {
        super(scene, x, y, 'rock', -14, {x: 1, y: 2, w: 14, h: 12});
    }
}