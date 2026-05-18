const walkAcceleration = 200;
const runAcceleration = 280;

const walkMaxSpeed = 80;
const runMaxSpeed = 150;
const veritcalMaxSpeed = 300;

const speedJumpInfluence = 0.1;

const coyoteTime = 100;

export class Player extends Phaser.Physics.Arcade.Sprite  {

    movingSpeed = 80;
    jumpSpeed = 230;
    isRunning = false;

    timeInAir = 0;
    isJumping = false;

    facingDirection = 1;

    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.body.setDragX(800);
        this.body.setMaxVelocity(walkMaxSpeed, veritcalMaxSpeed);

        this.setSize(9, 15)
        this.setOffset(8, 9);

        this.keys = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            jump: Phaser.Input.Keyboard.KeyCodes.Z,
            run: Phaser.Input.Keyboard.KeyCodes.X,
        });

        this.setDepth(10);
        this.createAnimations();

        scene.events.on('update', this.update, this);
        this.on('destroy', () => {
            scene.events.off('update', this.update, this);
        });
    }

    createAnimations() {
        const anims = this.scene.anims;

        anims.create({
            key: 'idle',
            frames: [
                { key: 'player', frame: 0 },
            ],
            frameRate: 10,
        });

        anims.create({
            key: 'walk',
            frames: [
                { key: 'player', frame: 0 },
                { key: 'player', frame: 1 },
                { key: 'player', frame: 0 },
                { key: 'player', frame: 2 },
            ],
            frameRate: 10,
            repeat: -1
        });

        anims.create({
            key: 'jump',
            frames: [
                { key: 'player', frame: 3 },
            ],
            frameRate: 10,
        });

        anims.create({
            key: 'fall',
            frames: [
                { key: 'player', frame: 4 },
            ],
            frameRate: 10,
        });

        anims.create({
            key: 'turn',
            frames: [
                { key: 'player', frame: 5 },
            ],
            frameRate: 10,
        });
    }

    update(time, delta) {
        if (!this.body) return;

        let inputDirection = this.keys.right.isDown - this.keys.left.isDown;

        if (this.body.blocked.down) {
            this.isJumping = false;
            this.timeInAir = 0;
        }

        if (this.isOnGroundCoyote()) {
            this.isRunning = this.keys.run.isDown;

            this.timeInAir += delta;
            if (Phaser.Input.Keyboard.JustDown(this.keys.jump)) {
                this.setVelocityY(-this.jumpSpeed - Math.abs(this.body.velocity.x * speedJumpInfluence));
                this.isJumping = true;
            }
        }

        if (this.body.velocity.y < 0 && !this.keys.jump.isDown) {
            this.body.velocity.y *= 0.8;
        }

        const acceleration = this.isRunning ? runAcceleration : walkAcceleration; 
        const maxSpeed = this.isRunning ? runMaxSpeed : walkMaxSpeed;

        this.setAccelerationX(inputDirection * acceleration);
        this.body.setMaxVelocity(maxSpeed, veritcalMaxSpeed);

        if (inputDirection !== 0) {
            this.facingDirection = inputDirection;
        }

        this.updateAnimations(inputDirection)
    }

    updateAnimations(inputDirection) {
        this.setFlipX(this.facingDirection < 0);

        if (!this.body.blocked.down) {
            if (this.body.velocity.y < 0) {
                this.anims.play('jump');
                return;
            }

            this.anims.play('fall');
            return;
        }

        if (inputDirection === 0) {
            this.anims.play('idle');
            return;
        }

        if (inputDirection != 0 && this.isRunning && Math.abs(this.body.velocity.x) > 20 && Math.sign(inputDirection) != Math.sign(this.body.velocity.x)) {
            this.anims.play('turn');
            return;
        }

        this.anims.play('walk', true);
    }

    isOnGroundCoyote() {
        return !this.isJumping && (this.body.blocked.down || this.timeInAir <= coyoteTime);
    }
}