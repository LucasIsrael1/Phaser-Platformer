export class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    create() {
        const gm = this.game.registry.get('game_manager');
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.6)
            .setOrigin(0, 0);

        this.add.bitmapText(cx, cy - 20, 'big_font', gm.t('pause')).setOrigin(0.5, 0.5);
        this.add.bitmapText(cx, cy + 10, 'small_font', gm.t('resume')).setOrigin(0.5, 0.5);
        this.add.bitmapText(cx, cy + 25, 'small_font', gm.t('menu')).setOrigin(0.5, 0.5);

        this.input.keyboard.once('keydown-P', () => {
        this.scene.stop('PauseScene');
        this.scene.resume('LevelScene');
        const LevelScene = this.scene.get('LevelScene');
        if (LevelScene.music) LevelScene.music.resume();
        });

        this.input.keyboard.once('keydown-M', () => {
            this.scene.stop('PauseScene');
            this.scene.stop('HUDScene');
            this.scene.stop('LevelScene');
            this.scene.start('TitleScreenScene');
        });
    }
}
