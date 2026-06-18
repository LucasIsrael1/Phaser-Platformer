export class ControlsScene extends Phaser.Scene {
    constructor() { super({ key: 'ControlsScene' }); }

    create() {
        const cx = this.cameras.main.width / 2;
        this.cameras.main.setBackgroundColor('#96aaff');

        this.add.bitmapText(cx, 20, 'big_font', 'CONTROLOS').setOrigin(0.5, 0.5);

        const controls = [
            '[SETAS]  MOVER',
            '[Z]      SALTAR',
            '[X]      CORRER',
            '[A]      APANHAR. ATIRAR. ESCAVAR',
            '[P]      PAUSAR',
        ];

        controls.forEach((line, i) => {
            this.add.bitmapText(20, 55 + i * 18, 'small_font', line);
        });

        this.add.bitmapText(cx, 160, 'small_font', 'PRIMA Z PARA VOLTAR').setOrigin(0.5, 0.5);

        this.input.keyboard.once('keydown-Z', () => {
            this.scene.start('TitleScreenScene');
        });
    }
}