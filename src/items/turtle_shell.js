import { Projectile, ProjectileState } from "./projectile.js";
import { Turtle } from "/src/entities/turtle.js";

export class TurtleShell extends Projectile  {
    
    heldOffset = -14;
    isThrown = false;

    constructor(scene, x, y) {
        super(scene, x, y, 'turtle_shell', -16, {x: 1, y: 2, w: 14, h: 12});
    }

    onCollide() {
        if (this.state !== ProjectileState.THROWN) return;

        const newTurtle = new Turtle(this.scene, this.x, this.y);
        this.scene.enemies.add(newTurtle);
        newTurtle.setPhysics();
        this.destroy();
    }
}   