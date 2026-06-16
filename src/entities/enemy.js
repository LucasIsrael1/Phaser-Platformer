export class Enemy extends Phaser.Physics.Arcade.Sprite {

    direction = -1;
    velocity = 0;

    constructor(scene, x, y, sprite, velocity, hitbox) {
        super(scene, x, y, sprite);
        
        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.velocity = velocity;

        this.setSize(hitbox.w, hitbox.h);
        this.setOffset(hitbox.x, hitbox.y);

        this.setDepth(9);

        this.setCollideWorldBounds(true);
    }

    setPhysics() {
        this.setVelocityX(this.velocity);
        this.setBounceX(1);
    }
}