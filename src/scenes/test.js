import { Player } from '/src/entities/player.js';
import { Terrain } from '/src/objects/terrain.js';
import { Enemy } from '/src/entities/enemy.js';
import { Crab } from '/src/entities/crab.js';
import { Turtle } from '/src/entities/turtle.js';
import { Berry } from '/src/items/berry.js';
import { Rock } from '/src/items/rock.js';
import { BurriedItem, ItemType } from '/src/objects/burried_item.js';

export class TestScene extends Phaser.Scene {
    constructor() {
        super('TestScene');
    }

    preload() {
        this.load.tilemapTiledJSON('tilemap', '/assets/tilemaps/test.json');
    }

    create() {
        this.cameras.main.setBackgroundColor('#96aaff');

        this.player = new Player(this, 0, 0);
        this.add.existing(this.player);
        this.cameras.main.startFollow(this.player);

        // tecla de pausa
        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        this.loadObjects();
        this.createOverlaps();

        // música de fundo em loop
        this.music = this.sound.add('music', { loop: true, volume: 0.5 });
        this.input.keyboard.once('keydown', () => {
            if (!this.music.isPlaying) this.music.play();
        });

        this.scene.launch('HUDScene');
    }

    loadObjects() {
        this.terrain = new Terrain(this, 'Terrain');
        this.terrain.setCameraBounds();

        this.objectLayer = this.terrain.getObjectLayer();

        this.berries = this.physics.add.staticGroup({classType: Berry});
        this.burriedItems = this.physics.add.staticGroup({classType: BurriedItem});

        this.enemies = this.physics.add.group({runChildUpdate: true});

        this.projectiles = this.physics.add.group({runChildUpdate: true});
        this.rocks = this.physics.add.group({runChildUpdate: true});
        
        this.objectLayer.objects.forEach(object => {
            object.x += 8;
            object.y -= 8;
            switch(object.type) {
                case 'Berry':
                    this.berries.create(object.x, object.y);
                    break;
                case 'SpawnPoint':
                    this.player.setPosition(object.x, object.y - 4);
                    break;
                case 'BurriedItem':
                    this.burriedItems.create(object.x, object.y + 5, object.properties[0].value);
                    break;
                case 'Crab':
                    const crab = new Crab(this, object.x, object.y - 3);
                    this.enemies.add(crab);
                    crab.setPhysics();
                    break;
                case 'Turtle':
                    const turtle = new Turtle(this, object.x, object.y - 3);
                    this.enemies.add(turtle);
                    turtle.setPhysics();
                    break;
            }
        });
    }

    createOverlaps() {
        this.terrain.addCollider(this.player);
        this.terrain.addCollider(this.enemies);
        this.terrain.addCollider(this.projectiles, (projectile, tile) => projectile.onCollide());

        this.physics.add.collider(this.enemies, this.player, null, (player, enemy) => enemy.handleCollision(player));

        this.physics.add.overlap(this.player, this.berries, (player, berry) => berry.onOverlap(), null, this);
        this.physics.add.overlap(this.player, this.burriedItems, (player, item) => item.onOverlap(player, item), null, this);

        this.physics.add.overlap(this.projectiles, this.berries, (projectile, berry) => berry.onOverlap(), null, this);
        this.physics.add.overlap(this.rocks, this.berries, (rock, berry) => berry.onOverlap(), null, this);

        // pedras a atingir inimigos
        this.physics.add.overlap(this.rocks, this.enemies, (rock, enemy) => rock.onHitEnemy(enemy), null, this);
    }


    update() {
        
        // pausar com P
        if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
            this.scene.pause('TestScene');
            this.scene.launch('PauseScene');
        }
    }

    playerDie() {
        // this.player.lives--;
        // this.events.emit('updateLives', this.player.lives);


        // this.scene.stop('HUDScene');
        // const hudScene = this.scene.get('HUDScene');
        // const score = hudScene ? hudScene.berryCount : 0;

        const gameManager = this.game.registry.get('game_manager');
        this.scene.launch('GameOverScene', { score: gameManager.berries });
        this.music.stop();
        this.scene.stop();
        return;
    }
}