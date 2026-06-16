export class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
        
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.setSize(12, 11)
        this.setOffset(6, 13);

        this.setDepth(9)
    }

    onOverlap(player, enemy) {
        if (player.heldItem || player.isDigging) return;
        if (Phaser.Input.Keyboard.JustDown(player.keys.item)) {
            this.digUp(player);
        }
    }

    update(time, delta) {
        if (!this.body) return;

        let inputDirection = this.keys.right.isDown - this.keys.left.isDown;

        if (this.isDigging) {
            this.handleDigging();
        } else {
            this.handleJumping(delta);
            this.handleMoving(inputDirection);
            if (this.heldItem) this.handleHeldItem();
        }

        this.updateAnimations(inputDirection, delta)
    }
}