import { Player } from "/src/entities/player.js";
import { Berry } from "/src/items/berry.js";
import { Rock } from "/src/items/rock.js";
import { BurriedItem, ItemType } from "/src/objects/burried-item.js";

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
        this.load.image('heart', '/assets/sprites/heart.png');
    }

    create() {
        this.cameras.main.setBackgroundColor("#96aaff");

        this.player = new Player(this, 0, 0);
        this.add.existing(this.player);
        this.cameras.main.startFollow(this.player);

        this.tilemap = this.add.tilemap('tilemap');
        
        this.createTerrain();
        this.loadObjects();
        this.createHUD();
    }

    createTerrain() {
        const tilesetImage = this.tilemap.addTilesetImage('Sand', 'tiles');

        this.terrainLayer = this.tilemap.createLayer('Terrain', tilesetImage, 0, 0);
        this.tilemap.setCollisionBetween(1, 100, true, 'Terrain');

        this.cameras.main.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
        this.physics.world.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);

        this.physics.add.collider(this.player, this.terrainLayer);
    }

    loadObjects() {
        this.objectLayer = this.tilemap.getObjectLayer('Objects');

        this.berries = this.physics.add.staticGroup({classType: Berry});
        this.burriedItems = this.physics.add.staticGroup({classType: BurriedItem});

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
            }
        });

        this.physics.add.overlap(this.player, this.berries, (player, berry) => berry.onOverlap(), null, this);
        this.physics.add.overlap(this.player, this.burriedItems, (player, item) => item.onOverlap(player, item), null, this);

        this.physics.add.overlap(this.rocks, this.berries, (rock, berry) => berry.onOverlap(), null, this);        
    
        // this.testRock = new Rock(this, this.player.x, this.player.y - 14);

        // this.rocks.add(this.testRock);
        // this.player.heldItem = this.testRock;
        // this.testRock.pickUp(this.player);

    }

    createHUD() {
        // Fundo semi-transparente
        this.hudBg = this.add.rectangle(0, 0, 80, 18, 0x000000, 0.35)
            .setOrigin(0, 0)
            .setScrollFactor(0)
            .setDepth(99);

        // Ícone da berry
        this.hudBerryIcon = this.add.sprite(10, 9, 'berry')
            .setOrigin(0.5, 0.5)
            .setScrollFactor(0)
            .setDepth(100);
        this.hudBerryIcon.anims.play('berry');

        // Texto do contador de berries
        this.hudBerryText = this.add.text(20, 9, 'x0', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'monospace',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0, 0.5).setScrollFactor(0).setDepth(100).setScale(0.333);

        // Ícone do coração
        this.hudHeartIcon = this.add.image(45, 9, 'heart')
            .setOrigin(0.5, 0.5)
            .setScrollFactor(0)
            .setDepth(100);

        // Texto do contador de vidas
        this.hudLivesText = this.add.text(55, 9, 'x3', {
            fontSize: '24px',
            fill: '#ffffff',
            fontFamily: 'monospace',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0, 0.5).setScrollFactor(0).setDepth(100).setScale(0.333);

        // Contadores internos
        this.berryCount = 0;
        this.livesCount = this.player.lives;

        // Ouvir evento de berry apanhada
        this.events.on('berryCollected', () => {
            this.berryCount++;
            this.hudBerryText.setText('x' + this.berryCount);
        });
    }

    update() {
        if (this.player.y > this.tilemap.heightInPixels + 20) {
            this.playerDie();
        }
    }

    playerDie() {
        this.player.lives--;
        this.livesCount = this.player.lives;
        this.hudLivesText.setText('x' + this.livesCount);

        if (this.player.lives <= 0) {
            // Por agora reinicia a cena ao morrer sem vidas
            this.scene.restart();
            return;
        }

        // Respawn no ponto inicial sem perder berries
        this.objectLayer.objects.forEach(object => {
            if (object.type === 'SpawnPoint') {
                this.player.setPosition(object.x + 8, object.y - 12);
                this.player.setVelocity(0, 0);
            }
        });
    }
}