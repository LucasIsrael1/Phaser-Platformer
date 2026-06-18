import { Player } from '/src/entities/player.js';
import { Terrain } from '/src/objects/terrain.js';
import { Enemy } from '/src/entities/enemy.js';
import { Crab } from '/src/entities/crab.js';
import { Turtle } from '/src/entities/turtle.js';
import { Berry } from '/src/items/berry.js';
import { Rock } from '/src/items/rock.js';
import { BurriedItem, ItemType } from '/src/objects/burried_item.js';

export class LevelScene extends Phaser.Scene {
    constructor() {
        super('LevelScene');
    }

    preload() {
        this.gm = this.game.registry.get('game_manager');
        this.levelKey = 'tilemap' + this.gm.level;

        this.load.tilemapTiledJSON(this.levelKey, this.gm.getLevelPath());
    }

    create() {
        // resetar game manager ao iniciar
        const gm = this.game.registry.get('game_manager');
        if (gm) gm.berries = 0;

        this.terrain = new Terrain(this, 'Terrain');
        this.terrain.setCameraBounds();
        this.terrain.setBackground()

        

        this.player = new Player(this, 0, 0);
        this.add.existing(this.player);
        this.cameras.main.startFollow(this.player);

        // tecla de pausa
        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        this.loadObjects();
        this.createOverlaps();

        // música de fundo em loop
        this.music = this.sound.add('music', { loop: true, volume: 0.7 });
        this.gameOverMusic = this.sound.add('game_over', {volume: 0.7 });
        this.levelClearMusic = this.sound.add('level_clear', {volume: 0.7 });
        
        this.input.keyboard.once('keydown', () => {
            if (!this.music.isPlaying) this.music.play();
        });

        this.scene.launch('HUDScene');
    }

    loadObjects() {
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
                case 'SpawnPoint':
                    this.player.setPosition(object.x, object.y - 4);
                    break;
                case 'Cave':
                    this.cave = this.physics.add.staticImage(object.x, object.y - 7, 'cave');
                    this.add.existing(this.cave);
                    this.physics.add.overlap(this.player, this.cave, (player, cave) => player.setState('win'), null, this);
                    break;
            }
        });

        // contar total de berries no mapa
        this.totalBerries = this.berries.getLength();
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

        // tartarugas a atingir inimigos
        this.physics.add.overlap(this.projectiles, this.enemies, (projectile, enemy) => projectile.onHitEnemy(enemy), null, this);
    }


    update() {

        const camX = this.cameras.main.scrollX;
        const camY = this.cameras.main.scrollY;

        this.sky.tilePositionX = camX * 0.05;
        this.sky.tilePositionY = camY * 0.1;

        if (this.hills) {
            this.hills.tilePositionX = camX * 0.5;
            this.hills.tilePositionY = camY * 0.5;
        }

        if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
            this.music.pause();
            this.scene.pause('LevelScene');
            this.scene.launch('PauseScene');
        }
    }

    playerDie() {
        this.scene.launch('GameOverScene');
        this.scene.stop();
        return;
    }
    
    clearLevel() {
        this.scene.stop('HUDScene');

        if (this.gm.level >= this.gm.levelCount) {
            this.scene.launch('EndScene');
        } else {
            this.scene.launch('WinScene');
        }

        this.scene.stop();
    }
}