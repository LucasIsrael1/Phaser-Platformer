export class OptionsScene extends Phaser.Scene {
    constructor() { super({ key: 'OptionsScene' }); }

    create() {
        const cx = this.cameras.main.width / 2;
        this.cameras.main.setBackgroundColor('#96aaff');

        this.add.bitmapText(cx, 20, 'big_font', 'OPCOES').setOrigin(0.5, 0.5);

        this.add.bitmapText(cx, 70, 'small_font', 'LINGUA').setOrigin(0.5, 0.5);
        this.langText = this.add.bitmapText(cx, 90, 'small_font', '< PT >').setOrigin(0.5, 0.5).setTint(0xFFD700);

        this.add.bitmapText(cx, 160, 'small_font', 'PRIMA Z PARA VOLTAR').setOrigin(0.5, 0.5);

        this.input.keyboard.once('keydown-Z', () => {
            this.scene.start('TitleScreenScene');
        });
    }
}