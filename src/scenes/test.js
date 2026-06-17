import { Player } from '/src/entities/player.js';
import { Terrain } from '/src/objects/terrain.js';
import { Enemy } from '/src/entities/enemy.js';
import { Crab } from '/src/entities/crab.js';
import { Berry } from '/src/items/berry.js';
import { Rock } from '/src/items/rock.js';
import { BurriedItem, ItemType } from '/src/objects/burried_item.js';

import createAnimations from '/src/managers/animations.js';

export class TestScene extends Phaser.Scene {
    constructor() {
        super('TestScene');
    }

    preload() {
        this.load.spritesheet('player', '/assets/sprites/player.png', {frameWidth: 24, frameHeight: 24});

        this.load.image('tiles', '/assets/sprites/tileset.png');
        this.load.tilemapTiledJSON('tilemap', '/assets/tilemaps/test.json');

        this.load.spritesheet('berry', '/assets/sprites/berry.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('rock', '/assets/sprites/rock.png');

        this.load.image('psychic', '/assets/sprites/psychic.png');

        this.load.image('burried_item', '/assets/sprites/burried_item.png');

        this.load.spritesheet('crab', '/assets/sprites/crab.png', {frameWidth: 24, frameHeight: 24});

        this.load.spritesheet('shelled_crab', '/assets/sprites/shelled_crab.png', {frameWidth: 24, frameHeight: 24});
        this.load.image('crab_shell', '/assets/sprites/crab_shell.png');
    }

    create() {
        this.cameras.main.setBackgroundColor('#96aaff');

        createAnimations(this.anims);

        this.player = new Player(this, 0, 0);
        this.add.existing(this.player);
        this.cameras.main.startFollow(this.player);

        this.loadObjects();
        this.createOverlaps();

        this.scene.launch('hud');
    }

    loadObjects() {
        this.terrain = new Terrain(this, 'Sand');
        this.terrain.setCameraBounds();

        this.objectLayer = this.terrain.getObjectLayer();

        this.berries = this.physics.add.staticGroup({classType: Berry});
        this.burriedItems = this.physics.add.staticGroup({classType: BurriedItem});

        this.enemies = this.physics.add.group({runChildUpdate: true});
        this.rocks = this.physics.add.group({classType: Rock, runChildUpdate: true});
        
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
            }
        });
    }

    createOverlaps() {
        this.terrain.addCollider(this.player);
        this.terrain.addCollider(this.enemies);

        this.physics.add.overlap(this.player, this.berries, (player, berry) => berry.onOverlap(), null, this);
        this.physics.add.overlap(this.player, this.burriedItems, (player, item) => item.onOverlap(player, item), null, this);

        this.physics.add.overlap(this.player, this.enemies, (player, enemy) => enemy.attack(player), null, this);

        this.physics.add.overlap(this.rocks, this.berries, (rock, berry) => berry.onOverlap(), null, this);
    }


    update() {
    }

    playerDie() {
        // this.player.lives--;
        // this.events.emit('updateLives', this.player.lives);


        // this.scene.stop('HUDScene');
        // const hudScene = this.scene.get('HUDScene');
        // const score = hudScene ? hudScene.berryCount : 0;
        const gameManager = this.game.registry.get('game_manager');
        this.scene.launch('GameOverScene', { score: gameManager.berries });
        this.scene.stop();
        return;
    }
}