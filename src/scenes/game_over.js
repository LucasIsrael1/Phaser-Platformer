export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor('#111111');

        // Texto
        this.add.bitmapText(cx, cy - 40, 'big_font', 'FIM DE JOGO').setOrigin(0.5, 0.5);

        // // Ícone berry + score
        // this.add.sprite(cx - 30, cy, 'berry').setOrigin(0.5, 0.5).anims.play('berry');
        // this.add.text(cx - 18, cy, 'x' + this.finalScore, {
        //     fontSize: '12px',
        //     fill: '#ffffff',
        //     fontFamily: 'monospace',
        //     stroke: '#000000',
        //     strokeThickness: 3
        // }).setOrigin(0, 0.5);

        this.add.bitmapText(cx, cy + 35, 'small_font', 'PRIMA [R] PARA JOGAR DE NOVO.').setOrigin(0.5, 0.5);

        // Input para reiniciar
        this.input.keyboard.once('keydown-R', () => {
            this.scene.stop('GameOverScene');
            this.scene.stop('HUDScene');
            this.scene.start('TestScene');
            this.scene.launch('HUDScene');
        });
    }
}