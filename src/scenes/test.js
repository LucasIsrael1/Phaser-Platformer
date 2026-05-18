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
        this.player = new Player(this, 0, 0);
        this.add.existing(this.player);
        this.cameras.main.startFollow(this.player);

        this.tilemap = this.add.tilemap('tilemap');
        
        this.createTerrain();
        this.loadObjects();
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
            }
        });

        this.physics.add.overlap(this.player, this.berries, (player, berry) => berry.onOverlap(), null, this);
    }

    update()
    {

    }
}