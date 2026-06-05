export class Rock extends Phaser.Physics.Arcade.Sprite  {

    heldOffset = -14;
    isThrown = false;

    constructor(scene, x, y) {
        super(scene, x, y, 'rock');
        this.setDepth(10);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.body.setAllowGravity(false);
        this.body.moves = false;

        this.heldPositionX = x;
        this.heldPositionY = y;

        this.setSize(14, 12);
        this.setOffset(1, 2);

        this.createPsychicParticles();
    }

    throwItem(direction, speedX, speedY) {
        this.isThrown = true;
        this.body.moves = true;
        this.body.reset(this.heldPositionX, this.heldPositionY);
        this.body.setAllowGravity(true);

        this.body.velocity.x = direction * 100 + speedX * 0.75;
        this.body.velocity.y = -150 + speedY * 0.25;

        this.scene.add.particles(this.x, this.y, 'psychic', {
            speed: { min: 50, max: 80 },
            scale: { start: 0.75, end: 0 },
            alpha: { start: 0.5, end: 0 },
            lifespan: 500,
            blendMode: 'ADD',
            emitting: false
        }).explode(5);

        this.psychicParticles.stop();

        this.scene.events.on('update', this.update, this);

        this.on('destroy', () => {
            this.scene.events.off('update', this.update, this);
            this.psychicParticles.destroy();
        });
    }

    updateHeldPosition(playerX, playerY, time) {
        const targetX = playerX;
        const targetY = playerY - 18;

        this.heldPositionX = Phaser.Math.Linear(this.x, targetX + Math.sin(time / 300) * 4, 0.15);
        this.heldPositionY = Phaser.Math.Linear(this.y, targetY + Math.sin(time / 200) * 3, 0.15);

        this.setPosition(this.heldPositionX, this.heldPositionY);
    }

    createPsychicParticles() {
        this.psychicParticles = this.scene.add.particles(0, 0, 'psychic', {
            speed: { min: 10, max: 30 },
            scale: { start: 0.75, end: 0 },
            alpha: { start: 0.5, end: 0 },
            lifespan: 500,
            blendMode: 'ADD',
            frequency: 80
        });
        this.psychicParticles.startFollow(this);
    }

    update() {
        if (this.y > this.scene.cameras.main.worldView.bottom + 20) {
            this.destroy();
        }
    }
}