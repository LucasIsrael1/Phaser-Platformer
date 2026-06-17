export class HUDScene extends Phaser.Scene {
    constructor() {
        super({ key: 'hud' });
    }

    preload() {
        this.load.image('berry_icon', '/assets/sprites/berry_icon.png');
        this.load.spritesheet('heart', '/assets/sprites/heart.png', {frameWidth: 16, frameHeight: 16});

        this.load.image('font_small_image', '/assets/fonts/small.png');
    }

    create() {
        this.gameManager = this.game.registry.get('game_manager');
        // Fonte
        this.cache.bitmapFont.add('small_font', Phaser.GameObjects.RetroFont.Parse(this, {
            image: 'font_small_image', width: 8, height: 8, charsPerRow: 13,
            chars: ' 0123456789.,ABCDEFGHIJKLMNOPQRSTUVWXYZ!?()[]',
        }));

        // Frutas
        this.add.sprite(18, 27, 'berry_icon').setOrigin(0.5, 0.5);
        
        this.berryText = this.add.bitmapText(27, 23, 'small_font', '00');
        const gameManager = this.game.registry.get('game_manager');
        this.updateBerries(gameManager.berries);

        // Corações

        this.hearts = [
            this.add.image(15, 14, 'heart').setOrigin(0.5, 0.5),
            this.add.image(30, 14, 'heart').setOrigin(0.5, 0.5),
            this.add.image(45, 14, 'heart').setOrigin(0.5, 0.5),
        ]

        // Remover listeners antigos antes de adicionar novos
        const gameScene = this.scene.get('TestScene');
        gameScene.events.off('update_berries');
        gameScene.events.off('update_hearts');

        gameScene.events.on('update_berries', (berries) => {
            this.updateBerries(berries)
        });
        gameScene.events.on('update_hearts', (hearts) => {
            this.updateHearts(hearts)
        });
    }

    updateBerries(berries) {
        this.berryText.setText(String(berries).padStart(2, '0'));
    }

    updateHearts(hearts) {
        for (let i = 0; i < this.hearts.length; i++) {
            this.hearts[i].setFrame(i < hearts ? 0 : 1);
        }
    }
}