export class ControlsScene extends Phaser.Scene {
    constructor() { super({ key: 'ControlsScene' }); }

    create() {
        const cx = this.cameras.main.width / 2;
        const gm = this.game.registry.get('game_manager');
        const t = (key) => gm.t(key);

        this.add.image(cx, 90, 'menu_bg').setOrigin(0.5, 0.5).setDepth(0);

        this.add.bitmapText(cx, 30, 'big_font', t('controls')).setOrigin(0.5, 0.5);

        const lines = ['controls_move','controls_jump','controls_run','controls_action','controls_pause'];
        lines.forEach((key, i) => {
            this.add.bitmapText(30, 60 + i * 16, 'small_font', t(key));
        });

        this.add.bitmapText(cx, 164, 'small_font', t('back_press')).setOrigin(0.5, 0.5);
        this.input.keyboard.once('keydown-X', () => this.scene.start('TitleScreenScene'));
    }
}