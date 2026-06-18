export class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WinScene' });
    }

    create() {
        const gameManager = this.game.registry.get('game_manager');

        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor('#000000');

        this.add.bitmapText(cx, cy - 40, 'big_font', 'NIVEL COMPLETO')
            .setOrigin(0.5, 0.5);

        this.add.sprite(cx - 20, cy, 'berry_icon').setOrigin(0.5, 0.5);
        this.add.bitmapText(cx - 8, cy - 6, 'small_font', String(gameManager.berries).padStart(2, '0'));

        this.add.bitmapText(cx, cy + 35, 'small_font', 'PRIMA R PARA JOGAR DE NOVO')
            .setOrigin(0.5, 0.5);

        this.input.keyboard.once('keydown-R', () => {
            this.scene.stop('WinScene');
            this.scene.start('TestScene');
            this.scene.launch('HUDScene');
        });
    }
}