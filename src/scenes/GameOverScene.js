export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    create() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        // Fundo escuro
        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.85)
            .setOrigin(0, 0);

        // Texto GAME OVER
        this.add.text(cx, cy - 40, 'GAME OVER', {
            fontSize: '20px',
            fill: '#ff4444',
            fontFamily: 'monospace',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5, 0.5);

        // Ícone berry + score
        this.add.sprite(cx - 30, cy, 'berry').setOrigin(0.5, 0.5).anims.play('berry');
        this.add.text(cx - 18, cy, 'x' + this.finalScore, {
            fontSize: '12px',
            fill: '#ffffff',
            fontFamily: 'monospace',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0, 0.5);

        // Texto para reiniciar
        this.add.text(cx, cy + 35, 'Prima R para jogar de novo', {
            fontSize: '8px',
            fill: '#aaaaaa',
            fontFamily: 'monospace'
        }).setOrigin(0.5, 0.5);

        // Input para reiniciar
        this.input.keyboard.once('keydown-R', () => {
            this.scene.stop('GameOverScene');
            // this.scene.stop('HUDScene');
            this.scene.start('TestScene');
            // this.scene.launch('HUDScene');
        });
    }
}