import { Enemy } from "./enemy.js";
import { TurtleShell } from "../items/turtle_shell.js";

export class Turtle extends Enemy  {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'turtle', 30, {x: 5, y: 10, w: 16, h: 14});

        this.anims.play('turtle_move');
    }

    handleCollision(player) {
        if (this.isDefeated) return false;
        
        // Atacar jogador normalmete
        if (player.body.prev.y + player.body.height > this.body.top + 8) {
            this.attack(player);
            return false;
        }

        // Permitir que jogador fique em cima das tartarugas
        if (player.body.velocity.y > 0) {
            if (!player.platform) player.platform = this;

            // Permitir que jogador apanhe a tartaruga
            if (
                !player.heldItem && player.stateName == 'play' && player.platform == this
                && Phaser.Input.Keyboard.JustDown(player.keys.item)
            ) {
                this.grab(player);
            }
        }

        return true;
    }

    grab(player) {
        // Estado do jogador
        player.setState('dig');
        player.platform = null;
        player.facingDirection = Math.sign(this.x - player.x);
        
        // Criar casco arremessável e remover tartaruga
        this.scene.time.delayedCall(200, () => {
            const shell = new TurtleShell(this.scene, this.x, this.y);
            this.scene.projectiles.add(shell);
            player.heldItem = shell;
            shell.pickUp(player);
            player.setState('play');
            this.destroy();
        });
    }

    update(time, delta) {
        super.update(time, delta);
        if (!this.isInRange) return;

        // Não cair em penhascos
        const canContinue = this.scene.terrain.isWalkable(this.x + this.direction * 4, this.y + 20);

        if (this.body.blocked.down && !canContinue) {
            this.direction *= -1;
        }
    }
}