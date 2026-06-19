import { Projectile, ProjectileState } from "./projectile.js";

export class Rock extends Projectile {
    heldOffset = -14;

    constructor(scene, x, y) {
        super(scene, x, y, 'rock', -14, {x: 1, y: 2, w: 14, h: 12});
    }

    onHitEnemy(enemy) {
        // Derrotar inimigos se estiver atirada
        if (this.state !== ProjectileState.THROWN) return;
        enemy.defeat();
        this.destroy();
    }
}