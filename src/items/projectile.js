export const ProjectileState = {
    IDLE: 0,
    HELD: 1,
    THROWN: 2
}

export class Projectile extends Phaser.Physics.Arcade.Sprite  {

    state = ProjectileState.IDLE;
    holder = null;

    constructor(scene, x, y, sprite, heldOffset, hitbox) {
        super(scene, x, y, sprite);
        this.setDepth(10);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.heldOffset = heldOffset;
        this.setSize(hitbox.w, hitbox.h);
        this.setOffset(hitbox.x, hitbox.y);

        this.createPsychicParticles();

        this.on('destroy', () => {
            this.scene.events.off('update', this.update, this);
            this.psychicParticles.destroy();
        });
    }

    update(time, delta) {
        if (!this.body) return;

        switch (this.state) {
            case ProjectileState.IDLE:
                this.updateIdle(time, delta);
                break;
            case ProjectileState.HELD:
                this.updateHeld(time, delta);
                break;
            case ProjectileState.THROWN:
                this.updateThrown(time, delta);
                break;
        }
    }

    updateIdle() {
        this.despawnIfOffscreen();
    }

    updateHeld(time, delta) {
        const targetX = this.holder.x;
        const targetY = this.holder.y + this.heldOffset;

        this.heldPositionX = Phaser.Math.Linear(this.x, targetX + Math.sin(time / 300) * 4, 0.15);
        this.heldPositionY = Phaser.Math.Linear(this.y, targetY + Math.sin(time / 200) * 3, 0.15);

        this.setPosition(this.heldPositionX, this.heldPositionY);
    }

    updateThrown() {
        this.despawnIfOffscreen();
    }

    pickUp(holder) {
        this.state = ProjectileState.HELD;
        this.holder = holder;
        
        this.body.setAllowGravity(false);
        this.body.moves = false;
        this.heldPositionX = this.body.x;
        this.heldPositionY = this.body.y;
    }

    throwItem(direction, speedX, speedY) {
        this.state = ProjectileState.THROWN;

        this.body.moves = true;
        this.body.reset(this.heldPositionX, this.heldPositionY);

        this.body.setAllowGravity(true);

        this.body.velocity.x = this.holder.facingDirection * 100 + this.holder.body.velocity.x * 0.75;
        this.body.velocity.y = -100 + this.holder.body.velocity.y * 0.5;

        this.spawnThrowParticles();

        this.holder = null;
    }

    despawnIfOffscreen() {
        if (this.y > this.scene.terrain.height + 16) {
            this.destroy();
        }
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

    spawnThrowParticles() {
        this.scene.add.particles(this.x, this.y, 'psychic', {
            speed: { min: 50, max: 80 },
            scale: { start: 0.75, end: 0 },
            alpha: { start: 0.5, end: 0 },
            lifespan: 500,
            blendMode: 'ADD',
            emitting: false
        }).explode(5);

        this.psychicParticles.stop();
    }

    onCollide() {   
    }
}