import { Enemy } from "./enemy.js";
import { TurtleShell } from "/src/items/turtle_shell.js";

export class Turtle extends Enemy  {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'turtle', -20, {x: 5, y: 10, w: 16, h: 14});

        this.anims.play('turtle_move');
    }

    handleCollision(player) {
        if (player.body.velocity.y > 0 && player.body.bottom <= this.body.top + 8) {
            player.platform = this;

            if (
                !player.heldItem && player.stateName == 'play'
                && Phaser.Input.Keyboard.JustDown(player.keys.item)
            ) {
                this.grab(player);
            }

            return true;
        }
        this.attack(player);
        return false;
    }

    grab(player) {
        player.setState('dig');
        player.platform = null;
        player.facingDirection = Math.sign(this.x - player.x);
        
        this.scene.time.delayedCall(200, () => {
            const shell = new TurtleShell(this.scene, this.x, this.y - 24);
            this.scene.projectiles.add(shell);
            player.heldItem = shell;
            shell.pickUp(player);
            player.setState('play');
            this.destroy();
        });
    }
}