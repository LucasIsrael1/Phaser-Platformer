export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        this.music = this.sound.add('game_over', { volume: 0.8 });
        this.music.play();
        this.cameras.main.setBackgroundColor('#111111');

        // Texto
        const gm = this.game.registry.get('game_manager');
        this.add.bitmapText(cx, cy - 40, 'big_font', gm.t('game_over')).setOrigin(0.5, 0.5);

        // // Ícone berry + score
        // this.add.sprite(cx - 30, cy, 'berry').setOrigin(0.5, 0.5).anims.play('berry');
        // this.add.text(cx - 18, cy, 'x' + this.finalScore, {
        //     fontSize: '12px',
        //     fill: '#ffffff',
        //     fontFamily: 'monospace',
        //     stroke: '#000000',
        //     strokeThickness: 3
        // }).setOrigin(0, 0.5);

        this.add.bitmapText(cx, cy + 35, 'small_font', gm.t('restart')).setOrigin(0.5, 0.5);
        this.add.bitmapText(cx, cy + 50, 'small_font', gm.t('menu')).setOrigin(0.5, 0.5);

        // Input para voltar ao menu
        this.input.keyboard.once('keydown-M', () => {
            this.scene.stop('GameOverScene');
            this.scene.stop('HUDScene');
            this.music.stop();
            this.scene.start('TitleScreenScene');
        });

        // Input para reiniciar
        this.input.keyboard.once('keydown-R', () => {
            this.scene.stop('GameOverScene');
            this.scene.stop('HUDScene');
            this.music.stop();
            this.scene.start('LevelScene');
            this.scene.launch('HUDScene');
        });
    }
}