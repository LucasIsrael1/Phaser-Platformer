export class TitleScreenScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScreenScene' });
    }

    create() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor('#96aaff');

        this.add.bitmapText(cx, cy - 40, 'big_font', 'NOME DO JOGO').setOrigin(0.5, 0.5);        
    }
}