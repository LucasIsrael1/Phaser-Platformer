export class CreditsScene extends Phaser.Scene {
    constructor() { super({ key: 'CreditsScene' }); }

    create() {
        const cx = this.cameras.main.width / 2;
        const gm = this.game.registry.get('game_manager');
        const t = (key) => gm.t(key);

        this.add.image(cx, 90, 'menu_bg').setOrigin(0.5, 0.5).setDepth(0);

        this.add.bitmapText(cx, 30, 'big_font', t('credits')).setOrigin(0.5, 0.5);

        this.add.bitmapText(cx, 65, 'small_font', t('credits_by')).setOrigin(0.5, 0.5);
        this.add.bitmapText(cx, 85, 'small_font', 'SIMAO GIGANTE - 33403').setOrigin(0.5, 0.5);
        this.add.bitmapText(cx, 100, 'small_font', 'LUCAS MONTAGNA - 33454').setOrigin(0.5, 0.5);
        this.add.bitmapText(cx, 125, 'small_font', t('credits_engine')).setOrigin(0.5, 0.5);
        this.add.bitmapText(cx, 140, 'small_font', t('credits_school')).setOrigin(0.5, 0.5);

        this.add.bitmapText(cx, 164, 'small_font', t('back_press')).setOrigin(0.5, 0.5);
        this.input.keyboard.once('keydown-X', () => this.scene.start('TitleScreenScene'));
    }
}