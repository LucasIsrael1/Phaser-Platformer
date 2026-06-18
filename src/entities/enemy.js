export class Enemy extends Phaser.Physics.Arcade.Sprite {

    

    constructor(scene, x, y, sprite, speed, hitbox) {
        super(scene, x, y, sprite);
        
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.speed = speed;
        this.direction = -1;

        this.setSize(hitbox.w, hitbox.h);
        this.setOffset(hitbox.x, hitbox.y);

        this.setDepth(9);

        this.setCollideWorldBounds(true);
    }

    setPhysics() {
        this.setVelocityX(this.moveSpeed);
        this.setBounceX(1);
    }

    handleCollision(player) {
        this.attack(player);
        return false;
    }

    attack(player) {
        player.knockbackDirection = Math.sign(player.x - this.x);
        player.damage(1);
    }

    update() {
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
    // pequena animação de derrota antes de destruir
        this.body.setVelocity(0, -150);
        this.body.setAllowGravity(true);
        this.setFlipY(true);
        this.scene.time.delayedCall(600, () => {
            this.destroy();
        });
    }
}