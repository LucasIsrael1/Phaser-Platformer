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
    // Movimento
    movingSpeed = 80;
    isRunning = false;

    timeInAir = 0;
    isJumping = false;

    facingDirection = 1;

    platform = null;

    // Carregar items
    heldItem = null;
    throwTimer = 0;
    
    // Gestão de estados
    stateName = '';
    currentState = null;

    // Dano
    damageTimer = 0;
    invincibilityFrames = 0;
    knockbackDirection = 0;
    
    // Derrota/vitória
    isDefeated = false;
    hasWon = false;

    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.physics.add.existing(this);

        // Física
        this.body.setDragX(800);
        this.body.setGravityY(jumpGravity);
        this.body.setMaxVelocity(walkMaxSpeed, veritcalMaxSpeed);
        this.body.setCollideWorldBounds(true);

        // Hitbox
        this.setSize(9, 15)
        this.setOffset(8, 9);

        // Teclas
        this.keys = scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            jump: Phaser.Input.Keyboard.KeyCodes.Z,
            jumpSpace: Phaser.Input.Keyboard.KeyCodes.SPACE,
            jumpUp: Phaser.Input.Keyboard.KeyCodes.UP,
            run: Phaser.Input.Keyboard.KeyCodes.X,
            item: Phaser.Input.Keyboard.KeyCodes.A,
        });

        this.setDepth(10);

        // Estado inicial
        this.setState('play');

        // Desconectar eventos
        scene.events.on('update', this.update, this);
        this.on('destroy', () => {
            scene.events.off('update', this.update, this);
        });
    }

    update(time, delta) {
        if (!this.body) return;
        // Input do utilizador
        let inputDirection = this.keys.right.isDown - this.keys.left.isDown;
        // Comportamento diferente dependente do estado
        if (this.currentState?.update) this.currentState.update(this, time, delta, inputDirection);
    }

    // Entrar em um estado
    setState(name) {
        if (name == this.stateName) return;
        this.stateName = name;
        // Sair do estado anterior
        if (this.currentState?.exit) this.currentState.exit(this);
        this.currentState = states[name];
        // Entrar no novo estado
        if (this.currentState?.enter) this.currentState.enter(this);
    }

    // Movimento horizontal
    handleMoving(inputDirection) {
        const acceleration = this.isRunning ? runAcceleration : walkAcceleration; 
        const maxSpeed = this.isRunning ? runMaxSpeed : walkMaxSpeed;

        this.setAccelerationX(inputDirection * acceleration);
        this.body.setMaxVelocity(maxSpeed, veritcalMaxSpeed);

        if (inputDirection !== 0) {
            this.facingDirection = inputDirection;
        }
    }

    // Movimento vertical
    handleJumping(delta) {
        if (this.body.blocked.down) {
            this.isJumping = false;
            this.timeInAir = 0;
        }

        // Coyote timing: O jogador pode pular poucos frames após cair
        if (this.isOnGroundCoyote()) {
            this.isRunning = this.keys.run.isDown;
            this.timeInAir += delta;

            //Pular
            if (Phaser.Input.Keyboard.JustDown(this.keys.jump) || 
                Phaser.Input.Keyboard.JustDown(this.keys.jumpSpace) || 
                Phaser.Input.Keyboard.JustDown(this.keys.jumpUp)
            ) {
                this.scene.sound.play('jump', { volume: 0.3 });
                this.setVelocityY(-jumpSpeed - Math.abs(this.body.velocity.x * speedJumpInfluence));
                this.isJumping = true;
            }
        }

        // Cair mais rápido ao soltar tecla de pular
        if (this.body.velocity.y < 0 && !this.keys.jump.isDown && !this.keys.jumpSpace.isDown && !this.keys.jumpUp.isDown) {
            this.body.velocity.y *= 0.8;
        }

        // Gravidades diferentes ao subir e ao descer
        if (this.body.velocity.y > 0) {
            this.body.setGravityY(fallGravity);
        } else {
            this.body.setGravityY(jumpGravity);
        }
    }

    // Arremessar item
    handleHeldItem() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.item)) {
            this.heldItem.throwItem();
            this.heldItem = null;
            this.throwTimer = 200;
        }
    }

    // Invencibilidade após sofrer dano
    handleInvincibility(delta) {
        if (this.invincibilityFrames <= 0) {
            this.visible = true;
            return;
        }
        
        this.invincibilityFrames -= delta;
        this.visible = this.invincibilityFrames % 100 >= 50;
    }

    // Movimentar-se junto com plataformas móveis
    handlePlatform() {
        if (!this.platform?.body) {
            this.platform = null;
            return;
        }
        // Adicionar variância de posição
        this.x += this.platform.body.deltaX();
        this.y += this.platform.body.deltaY();
        // Sair da plataforma
        if (!this.body.touching.down || !this.platform.body.touching.up) this.platform = null;
    }

    // Derrotar jogador ao cair do mapa
    checkOutOfBounds() {
        if (this.y > this.scene.terrain.height - 16) {
            this.scene.gm.hp = 0;
            this.setState('defeat');
        }
    }

    // Coyote timing: Verificar se jogador está no chão ou acabou de cair (mas não pulou)
    isOnGroundCoyote() {
        return !this.isJumping && (this.body.blocked.down || this.timeInAir <= coyoteTime);
    }

    // Sofrer dano
    damage(amount) {
        // Previnir dano durante invencibilidade
        if (this.invincibilityFrames > 0) return;
        // Reduzir vida
        this.scene.gm.hp -= amount;
        // Derrotar jogador quando sem vida
        if (this.scene.gm.hp <= 0) {
            this.setState('defeat');
            return;
        }
        // Sequência de estado
        this.scene.sound.play('damage', { volume: 0.7 });
        this.setState('damage');
        this.invincibilityFrames = 2000;
        // Emição do evento
        this.scene.events.emit('update_hearts', this.scene.gm.hp);
    }

    // Atualizar animações
    updateAnimations(inputDirection, delta) {
        this.setFlipX(this.facingDirection < 0);
        this.anims.timeScale = 1;

        if (this.throwTimer > 0) {
            this.throwTimer -= delta;
            this.anims.play('player_throw');
            return;
        }

        let prefix = 'player';

        // Sprites diferentes ao carregar item
        if (this.heldItem) prefix += '_carry'

        // Jogador no ar
        if (!this.body.blocked.down) {
            // A subir
            if (this.body.velocity.y < 0) {
                this.anims.play(prefix + '_jump');
                return;
            }
            // A descer
            this.anims.play(prefix + '_fall');
            return;
        }

        // Parado
        if (inputDirection === 0) {
            this.anims.play(prefix + '_idle');
            return;
        }

        // Virar
        if (inputDirection != 0 && this.isRunning && Math.abs(this.body.velocity.x) > 20 && Math.sign(inputDirection) != Math.sign(this.body.velocity.x)) {
            this.anims.play(prefix + '_turn');
            return;
        }

        // Andar (atualiza velocidade da animação de acordo com velocidade de movimento)
        this.anims.timeScale = 0.2 + Math.abs(this.body.velocity.x) * 0.02;
        this.anims.play(prefix + '_walk', true);
    }
}

// Sistema de estados
const states = {
    // Estado de gameplay normal
    'play': {
        update: (player, time, delta, inputDirection) => {
            player.handleJumping(delta);
            player.handleMoving(inputDirection);
            if (player.heldItem) player.handleHeldItem();
            player.updateAnimations(inputDirection, delta);
            player.handleInvincibility(delta);
            player.handlePlatform();
            player.checkOutOfBounds();
        }
    },
    // Cavar itens do chão, impede movimento.
    'dig': {
        enter: (player) => {
            player.body.setVelocity(0, 0);
            player.body.setAcceleration(0, 0);
            player.anims.play('player_dig');
        },
        update: (player, time, delta, inputDirection) => {
            player.handleInvincibility(delta);
            player.handlePlatform();
            player.checkOutOfBounds();
        }
    },
    // Receber dano. Sofre knockback e previne inputs
    'damage': {
        enter: (player) => {
            player.body.setVelocity(player.knockbackDirection * 200, -120);
            player.body.setAcceleration(0, 0);
            player.anims.play('player_damage');
            player.damageTimer = 500;
            player.body.setMaxVelocity(300, 300);
        },
        update: (player, time, delta, inputDirection) => {
            player.damageTimer -= delta;
            if (player.damageTimer <= 0) player.setState('play');
            player.handleInvincibility(delta);
            player.handlePlatform();
            player.checkOutOfBounds();
        },
        exit: (player) => {
            player.body.setMaxVelocity(walkMaxSpeed, veritcalMaxSpeed);
        }
    },
    // Sequência de derrota, impede interações com o mundo
    'defeat': {
        enter: (player) => {
            player.body.setVelocity(0, -200);
            player.body.setAcceleration(0, 0);
            player.body.setGravityY(20);
            player.body.setCollideWorldBounds(false);
            player.anims.play('player_defeat');
            player.body.checkCollision.none = true;
            player.isDefeated = true;
            player.damageTimer = 2000;
            player.visible = true;
            player.scene.events.emit('update_hearts', 0);

            player.scene.music.stop();
            player.scene.gameOverMusic.play();
        },
        update: (player, time, delta, inputDirection) => {
            // Contador para ecrã de Game Over
            player.damageTimer -= delta;
            if (player.damageTimer <= 0) player.scene.playerDie();
        }
    },
    // Sequência de vitória
    'win': {
        enter: (player) => {
            player.body.setVelocityX(0);
            player.body.setAccelerationX(0);
            player.body.setGravityY(fallGravity);
            player.visible = true;

            player.scene.music.stop();
            player.scene.levelClearMusic.play();
        },
        update: (player, time, delta, inputDirection) => {
            if (player.hasWon) return;

            // Caminhar até o centro da caverna 
            const distance = player.scene.cave.x - player.x;
            if (distance < -1) {
                player.setAccelerationX(-walkAcceleration);
                player.anims.timeScale = 0.2 + Math.abs(player.body.velocity.x) * 0.02;
                player.setFlipX(true);
            }
            else if (distance > 1) {
                player.setAccelerationX(walkAcceleration);
                player.anims.timeScale = 0.2 + Math.abs(player.body.velocity.x) * 0.02;
                player.setFlipX(false);
            // Progredir sequência
            } else {
                player.setAccelerationX(0);
                player.setVelocityX(0);
                player.anims.play('player_win');
                player.setFlipX(false);
                player.hasWon = true;
                
                player.scene.time.delayedCall(3000, () => {
                    player.scene.clearLevel();
                });
                return;
            }
            // Animações de movimento
            if (!player.body.blocked.down) {
                player.anims.play('player_fall');
            } else {
                player.anims.play('player_walk', true);
            }
        }
    }
}