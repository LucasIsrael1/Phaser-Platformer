export class HUDScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HUDScene' });
    }

    preload() {
        this.load.image('font_small_image', '/assets/fonts/small.png');
    }

    create() {
        // Fonte
        this.cache.bitmapFont.add('small_font', Phaser.GameObjects.RetroFont.Parse(this, {
            image: 'font_small_image', width: 8, height: 8, charsPerRow: 13,
            chars: "0123456789.!?ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        }));

        // Ícone da berry
        const berryIcon = this.add.sprite(14, 13, 'berry').setOrigin(0.5, 0.5);
        
        // Texto do contador de berries
        this.berryText = this.add.bitmapText(24, 13, 'small_font', 'X0');

        // Ícone do coração
        this.add.image(60, 13, 'heart').setOrigin(0.5, 0.5);

        // Texto do contador de vidas
        this.berryText = this.add.bitmapText(70, 13, 'small_font', 'X3');

        this.berryCount = 0;

        // Remover listeners antigos antes de adicionar novos
        const gameScene = this.scene.get('TestScene');
        gameScene.events.off('berryCollected');
        gameScene.events.off('updateLives');

        gameScene.events.on('berryCollected', () => {
            this.berryCount++;
            // this.berryText.setText('x' + this.berryCount);
        });
        gameScene.events.on('updateLives', (lives) => {
            // this.livesText.setText('x' + lives);
        });
    }
}