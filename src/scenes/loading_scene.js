import createAnimations from '/src/managers/animations.js';

export class LoadingScene extends Phaser.Scene {
    constructor() { super('LoadingScene'); }

    preload() {
        this.load.spritesheet('player', '/assets/sprites/player.png', {frameWidth: 24, frameHeight: 24});
        
        this.load.image('tiles', '/assets/sprites/tileset.png');
        
        this.load.spritesheet('berry', '/assets/sprites/berry.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('rock', '/assets/sprites/rock.png');
        this.load.image('burried_item', '/assets/sprites/burried_item.png');
        this.load.image('psychic', '/assets/sprites/psychic.png');

        this.load.spritesheet('crab', '/assets/sprites/crab.png', {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet('turtle', '/assets/sprites/turtle.png', {frameWidth: 24, frameHeight: 24});

        this.load.image('font_small_image', '/assets/fonts/small.png');
        this.load.image('font_big_image', '/assets/fonts/big.png');

        this.load.image('berry_icon', '/assets/sprites/berry_icon.png');
        this.load.spritesheet('heart', '/assets/sprites/heart.png', {frameWidth: 16, frameHeight: 16});
    }

    create() {
        this.cameras.main.setBackgroundColor('#000000');

        this.cache.bitmapFont.add('small_font', Phaser.GameObjects.RetroFont.Parse(this, {
            image: 'font_small_image', width: 8, height: 8, charsPerRow: 13,
            chars: ' 0123456789.,ABCDEFGHIJKLMNOPQRSTUVWXYZ!?()[]',
        }));
        this.cache.bitmapFont.add('big_font', Phaser.GameObjects.RetroFont.Parse(this, {
            image: 'font_big_image', width: 16, height: 16, charsPerRow: 13,
            chars: ' 0123456789.,ABCDEFGHIJKLMNOPQRSTUVWXYZ!?()[]',
        }));
        createAnimations(this.anims);

        this.scene.start('TestScene');
    }
}