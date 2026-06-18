export class CreditsScene extends Phaser.Scene {
    constructor() { super({ key: 'CreditsScene' }); }

    create() {
        const cx = this.cameras.main.width / 2;
        const gm = this.game.registry.get('game_manager');
        const t = (key) => gm.t(key);

        this.cameras.main.setBackgroundColor('#96aaff');
        this.add.bitmapText(cx, 20, 'big_font', t('credits')).setOrigin(0.5, 0.5);

        this.add.bitmapText(cx, 65, 'small_font', t('credits_by')).setOrigin(0.5, 0.5);
        this.add.bitmapText(cx, 85, 'small_font', 'SIMAO GIGANTE - 33403').setOrigin(0.5, 0.5);
        this.add.bitmapText(cx, 100, 'small_font', 'LUCAS MONTAGNA - 33454').setOrigin(0.5, 0.5);
        this.add.bitmapText(cx, 125, 'small_font', t('credits_engine')).setOrigin(0.5, 0.5);
        this.add.bitmapText(cx, 140, 'small_font', t('credits_school')).setOrigin(0.5, 0.5);

        this.add.bitmapText(cx, 165, 'small_font', t('back')).setOrigin(0.5, 0.5);
        this.input.keyboard.once('keydown-Z', () => this.scene.start('TitleScreenScene'));
    }
}