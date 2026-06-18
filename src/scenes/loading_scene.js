import createAnimations from '/src/managers/animations.js';

export class LoadingScene extends Phaser.Scene {
    constructor() { super('LoadingScene'); }

    preload() {
        this.load.spritesheet('player', '/assets/sprites/player.png', {frameWidth: 24, frameHeight: 24});
        
        this.load.image('tiles', '/assets/sprites/tileset.png');
        
        this.load.spritesheet('berry', '/assets/sprites/berry.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('rock', '/assets/sprites/rock.png');
        this.load.image('burried_item', '/assets/sprites/burried_item.png');
        this.load.image('fish', '/assets/sprites/fish.png');
        this.load.image('psychic', '/assets/sprites/psychic.png');
        this.load.image('cave', '/assets/sprites/cave.png');

        this.load.spritesheet('crab', '/assets/sprites/crab.png', {frameWidth: 24, frameHeight: 24});
        this.load.spritesheet('turtle', '/assets/sprites/turtle.png', {frameWidth: 24, frameHeight: 24});

        this.load.image('font_small_image', '/assets/fonts/small.png');
        this.load.image('font_big_image', '/assets/fonts/big.png');

        this.load.image('berry_icon', '/assets/sprites/berry_icon.png');
        this.load.spritesheet('heart', '/assets/sprites/heart.png', {frameWidth: 16, frameHeight: 16});

        this.load.image('menu_bg', '/assets/bgs/menu_bg.png');
        this.load.image('cave_bg', '/assets/bgs/cave_bg.png');

        this.load.image('sky_day', '/assets/bgs/sky_day.png');
        this.load.image('hills_day', '/assets/bgs/hills_day.png');
        this.load.image('sky_afternoon', '/assets/bgs/sky_afternoon.png');
        this.load.image('hills_afternoon', '/assets/bgs/hills_afternoon.png');
        this.load.image('sky_cave', '/assets/bgs/sky_cave.png');

        this.load.audio('music', '/assets/audio/music.ogg');
        this.load.audio('title', '/assets/audio/title.ogg');
        this.load.audio('game_over', '/assets/audio/game_over.mp3');

        this.load.audio('damage', '/assets/audio/damage.ogg');
        this.load.audio('jump', '/assets/audio/jump.mp3');
        this.load.audio('fruta', '/assets/audio/fruta.mp3');
        this.load.audio('throw', '/assets/audio/throw.mp3');
        this.load.audio('victory', '/assets/audio/victory.mp3');
        
        const translations = this.load.json('lang', '/assets/lang.json');
    }

    create() {
        this.gameManager = this.game.registry.get('game_manager');
        this.gameManager.translations = this.cache.json.get('lang');

        this.add.image(160, 90, 'menu_bg').setOrigin(0.5, 0.5);
        this.cameras.main.setBackgroundColor('#000000');

        const chars = ' 0123456789.,ABCDEFGHIJKLMNOPQRSTUVWXYZ!?()[]<>%:-/'

        this.cache.bitmapFont.add('small_font', Phaser.GameObjects.RetroFont.Parse(this, {
            image: 'font_small_image', width: 8, height: 8, charsPerRow: 13,
            chars: chars,
        }));
        this.cache.bitmapFont.add('big_font', Phaser.GameObjects.RetroFont.Parse(this, {
            image: 'font_big_image', width: 16, height: 16, charsPerRow: 13,
            chars: chars,
        }));
        createAnimations(this.anims);

        this.scene.start('TitleScreenScene');
    }
}