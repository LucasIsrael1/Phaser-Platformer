import { States } from "/src/entities/states/player_states.js";

const walkAcceleration = 190;
const runAcceleration = 280;

const walkMaxSpeed = 70;
const runMaxSpeed = 140;
const veritcalMaxSpeed = 300;
const jumpSpeed = 240;

const speedJumpInfluence = 0.1;

const coyoteTime = 100;

const jumpGravity = 50;
const fallGravity = 150;

export class Player extends Phaser.Physics.Arcade.Sprite {

    lives = 3;
    
    movingSpeed = 80;
    isRunning = false;

    timeInAir = 0;
    isJumping = false;

    facingDirection = 1;

    heldItem = null;
    throwTimer = 0;

    stateName = '';
    currentState = null;

    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.physics.add.existing(this);

        this.body.setDragX(800);
        this.body.setGravityY(jumpGravity);
        this.body.setMaxVelocity(walkMaxSpeed, veritcalMaxSpeed);

        this.setSize(9, 15)
        this.setOffset(8, 9);

        this.keys = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            jump: Phaser.Input.Keyboard.KeyCodes.Z,
            run: Phaser.Input.Keyboard.KeyCodes.X,
            item: Phaser.Input.Keyboard.KeyCodes.A,
        });

        this.setDepth(10);
        this.createAnimations();

        this.setState('play');

        scene.events.on('update', this.update, this);
        this.on('destroy', () => {
            scene.events.off('update', this.update, this);
        });
    }

    update(time, delta) {
        if (!this.body) return;

        let inputDirection = this.keys.right.isDown - this.keys.left.isDown;

        if (this.currentState?.update) this.currentState.update(this, time, delta, inputDirection);
    }

    setState(name) {
        if (name == this.stateName) return;
        if (this.currentState?.exit) this.currentState.exit(this);
        this.currentState = States[name];
        if (this.currentState?.enter) this.currentState.enter(this);
    }

    handleMoving(inputDirection) {
        const acceleration = this.isRunning ? runAcceleration : walkAcceleration; 
        const maxSpeed = this.isRunning ? runMaxSpeed : walkMaxSpeed;

        this.setAccelerationX(inputDirection * acceleration);
        this.body.setMaxVelocity(maxSpeed, veritcalMaxSpeed);

        if (inputDirection !== 0) {
            this.facingDirection = inputDirection;
        }
    }

    handleJumping(delta) {
        if (this.body.blocked.down) {
            this.isJumping = false;
            this.timeInAir = 0;
        }

        if (this.isOnGroundCoyote()) {
            this.isRunning = this.keys.run.isDown;

            this.timeInAir += delta;
            if (Phaser.Input.Keyboard.JustDown(this.keys.jump)) {
                this.setVelocityY(-jumpSpeed - Math.abs(this.body.velocity.x * speedJumpInfluence));
                this.isJumping = true;
            }
        }

        if (this.body.velocity.y < 0 && !this.keys.jump.isDown) {
            this.body.velocity.y *= 0.8;
        }

        if (this.body.velocity.y > 0) {
            this.body.setGravityY(fallGravity);
        } else {
            this.body.setGravityY(jumpGravity);
        }
    }

    handleHeldItem() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.item)) {
            this.heldItem.throwItem();
            this.heldItem = null;
            this.throwTimer = 200;
        }
    }

    updateAnimations(inputDirection, delta) {
        this.setFlipX(this.facingDirection < 0);
        this.anims.timeScale = 1;

        if (this.throwTimer > 0) {
            this.throwTimer -= delta;
            this.anims.play('player_throw');
            return;
        }

        let prefix = 'player';

        if (this.heldItem) prefix += '_carry'

        if (!this.body.blocked.down) {
            if (this.body.velocity.y < 0) {
                this.anims.play(prefix + '_jump');
                return;
            }

            this.anims.play(prefix + '_fall');
            return;
        }

        if (inputDirection === 0) {
            this.anims.play(prefix + '_idle');
            return;
        }

        if (inputDirection != 0 && this.isRunning && Math.abs(this.body.velocity.x) > 20 && Math.sign(inputDirection) != Math.sign(this.body.velocity.x)) {
            this.anims.play(prefix + '_turn');
            return;
        }

        this.anims.timeScale = 0.2 + Math.abs(this.body.velocity.x) * 0.02;
        this.anims.play(prefix + '_walk', true);
    }

    isOnGroundCoyote() {
        return !this.isJumping && (this.body.blocked.down || this.timeInAir <= coyoteTime);
    }

    createAnimations() {
        const anims = this.scene.anims;

        anims.create({
            key: 'player_idle',
            frames: [
                { key: 'player', frame: 0 },
            ],
            frameRate: 10,
        });

        anims.create({
            key: 'player_walk',
            frames: [
                { key: 'player', frame: 0 },
                { key: 'player', frame: 1 },
                { key: 'player', frame: 0 },
                { key: 'player', frame: 2 },
            ],
            frameRate: 5,
            repeat: -1
        });

        anims.create({
            key: 'player_jump',
            frames: [
                { key: 'player', frame: 3 },
            ],
            frameRate: 10,
        });

        anims.create({
            key: 'player_fall',
            frames: [
                { key: 'player', frame: 4 },
            ],
            frameRate: 10,
        });

        anims.create({
            key: 'player_turn',
            frames: [
                { key: 'player', frame: 5 },
            ],
            frameRate: 10,
        });

        anims.create({
            key: 'player_dig',
            frames: [
                { key: 'player', frame: 6 },
            ],
            frameRate: 10,
        });

        anims.create({
            key: 'player_dig_finish',
            frames: [
                { key: 'player', frame: 7 },
            ],
            frameRate: 10,
        });

        anims.create({
            key: 'player_carry_idle',
            frames: [
                { key: 'player', frame: 8 },
            ],
            frameRate: 10,
        });

        anims.create({
            key: 'player_carry_walk',
            frames: [
                { key: 'player', frame: 8 },
                { key: 'player', frame: 9 },
                { key: 'player', frame: 8 },
                { key: 'player', frame: 10 },
            ],
            frameRate: 5,
            repeat: -1
        });

        anims.create({
            key: 'player_carry_jump',
            frames: [
                { key: 'player', frame: 11 },
            ],
            frameRate: 10,
        });

        anims.create({
            key: 'player_carry_fall',
            frames: [
                { key: 'player', frame: 12 },
            ],
            frameRate: 10,
        });

        anims.create({
            key: 'player_carry_turn',
            frames: [
                { key: 'player', frame: 13 },
            ],
            frameRate: 10,
        });

        anims.create({
            key: 'player_throw',
            frames: [
                { key: 'player', frame: 14 },
            ],
            frameRate: 10,
        });
    }
}