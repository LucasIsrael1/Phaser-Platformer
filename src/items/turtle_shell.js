import { Projectile, ProjectileState } from "./projectile.js";
import { Turtle } from "/src/entities/turtle.js";

export class TurtleShell extends Projectile  {
    
    heldOffset = -20;
    isThrown = false;

    constructor(scene, x, y) {
        super(scene, x, y, 'turtle', -16, {x: 4, y: 10, w: 16, h: 14});
        this.setFrame(3);
    }

    onCollide() {
        if (this.state !== ProjectileState.THROWN) return;

        const newTurtle = new Turtle(this.scene, this.x, this.y);
        this.scene.enemies.add(newTurtle);
        newTurtle.setPhysics();
        this.destroy();
    }

    onHitEnemy(enemy) {
        if (this.state !== ProjectileState.THROWN) return;
        enemy.defeat();
        this.destroy();
    }
}   