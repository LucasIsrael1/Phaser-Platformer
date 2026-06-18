export class CreditsScene extends Phaser.Scene {
    constructor() { super({ key: 'CreditsScene' }); }

    create() {
        const cx = this.cameras.main.width / 2;
        this.cameras.main.setBackgroundColor('#96aaff');

        this.add.bitmapText(cx, 20, 'big_font', 'CREDITOS').setOrigin(0.5, 0.5);

        this.add.bitmapText(cx, 65, 'small_font', 'DESENVOLVIDO POR:').setOrigin(0.5, 0.5);
        this.add.bitmapText(cx, 85, 'small_font', 'SIMAO GIGANTE - 33403').setOrigin(0.5, 0.5);
        this.add.bitmapText(cx, 100, 'small_font', 'LUCAS MONTAGNA - 33454').setOrigin(0.5, 0.5);

        this.add.bitmapText(cx, 125, 'small_font', 'FEITO COM PHASER 3').setOrigin(0.5, 0.5);
        this.add.bitmapText(cx, 140, 'small_font', 'ESTG. IPVC 2025.2026').setOrigin(0.5, 0.5);

        this.add.bitmapText(cx, 165, 'small_font', 'PRIMA Z PARA VOLTAR').setOrigin(0.5, 0.5);

        this.input.keyboard.once('keydown-Z', () => {
            this.scene.start('TitleScreenScene');
        });
    }
}