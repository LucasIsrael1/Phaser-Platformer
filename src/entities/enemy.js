const cameraRange = 100;

export class Enemy extends Phaser.Physics.Arcade.Sprite {

    isInRange = false;
    isDefeated = false;

    constructor(scene, x, y, sprite, speed, hitbox) {
        super(scene, x, y, sprite);
        
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.speed = speed;
        this.direction = -1;

        this.setSize(hitbox.w, hitbox.h);
        this.setOffset(hitbox.x, hitbox.y);

        this.setDepth(9);
    }

    setPhysics() {
        this.setVelocityX(this.moveSpeed);
        this.setBounceX(1);
    }

    handleCollision(player) {
        if (!this.isDefeated) this.attack(player);
        return false;
    }

    attack(player) {
        player.knockbackDirection = Math.sign(player.x - this.x);
        player.damage(1);
    }

    update() {
        const cam = this.scene.cameras.main;        
        this.isInRange = this.x > cam.worldView.x - cameraRange && this.x < cam.worldView.right + cameraRange;

        if (!this.isInRange) {
            this.setVelocityX(0);
            return;
        }

        this.setVelocityX(this.direction * this.speed);

        if (this.body.blocked.left) {
            this.direction = 1;
        }
        else if (this.body.blocked.right) {
            this.direction = -1;
        }

        this.setFlipX(this.direction > 0);
    }

    defeat() {
        // Pequena animação de derrota antes de destruir
        this.body.setVelocity(0, -150);
        this.body.setAllowGravity(true);
        this.setFlipY(true);
        this.isDefeated = true;
        this.scene.sound.play('damage', { volume: 0.7 });
        this.scene.time.delayedCall(600, () => {
            this.destroy();
        });
    }
}