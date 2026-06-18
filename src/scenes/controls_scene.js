export class ControlsScene extends Phaser.Scene {
    constructor() { super({ key: 'ControlsScene' }); }

    create() {
        const cx = this.cameras.main.width / 2;
        const gm = this.game.registry.get('game_manager');
        const t = (key) => gm.t(key);

        this.cameras.main.setBackgroundColor('#96aaff');
        this.add.bitmapText(cx, 20, 'big_font', t('controls')).setOrigin(0.5, 0.5);

        const lines = ['controls_move','controls_jump','controls_run','controls_action','controls_pause'];
        lines.forEach((key, i) => {
            this.add.bitmapText(20, 55 + i * 18, 'small_font', t(key));
        });

        this.add.bitmapText(cx, 160, 'small_font', t('back')).setOrigin(0.5, 0.5);
        this.input.keyboard.once('keydown-Z', () => this.scene.start('TitleScreenScene'));
    }
}