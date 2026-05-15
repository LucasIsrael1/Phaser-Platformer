import { Player } from "/src/entities/player.js";
import { Berry } from "/src/entities/berry.js";

export class TestScene extends Phaser.Scene {
    constructor() {
        super('TestScene');
    }

    preload() {
        this.load.spritesheet('player', '/assets/sprites/player.png', {frameWidth: 24, frameHeight: 24});

        this.load.image('tiles', '/assets/sprites/tileset.png');
        this.load.tilemapTiledJSON('tilemap', '/assets/tilemaps/test.json');

        this.load.image('berry', '/assets/sprites/berry.png');
    }

    create() {
        this.createTerrain();

        this.player = new Player(this, 64, 256);
        this.add.existing(this.player);
        this.cameras.main.startFollow(this.player);

        this.physics.add.collider(this.player, this.terrainLayer);

        this.berries = this.physics.add.staticGroup({classType: Berry});

        this.berries.create(64, 224);
        this.physics.add.overlap(this.player, this.berries, (player, berry) => berry.onOverlap(), null, this);
    }

    createTerrain() {
        this.tilemap = this.add.tilemap('tilemap');
        const tilesetImage = this.tilemap.addTilesetImage('Sand', 'tiles');

        this.terrainLayer = this.tilemap.createLayer('Terrain', tilesetImage, 0, 0);
        this.tilemap.setCollisionBetween(1, 100, true, 'Terrain');

        this.cameras.main.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
        this.physics.world.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);
    }

    update()
    {

    }
}