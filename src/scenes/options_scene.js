export class OptionsScene extends Phaser.Scene {
    constructor() { super({ key: 'OptionsScene' }); }

    create() {
        const cx = this.cameras.main.width / 2;
        const gm = this.game.registry.get('game_manager');

        this.cameras.main.setBackgroundColor('#96aaff');
        this.add.bitmapText(cx, 20, 'big_font', gm.t('options')).setOrigin(0.5, 0.5);
        this.add.bitmapText(cx, 60, 'small_font', gm.t('lang_label')).setOrigin(0.5, 0.5);

        this.langs = ['PT', 'EN', 'ES', 'FR'];
        this.langIndex = this.langs.indexOf(gm.lang);
        this.langTexts = [];

        this.langs.forEach((lang, i) => {
            const text = this.add.bitmapText(cx, 85 + i * 20, 'small_font', lang).setOrigin(0.5, 0.5);
            this.langTexts.push(text);
        });

        this.updateLangSelection();

        this.input.keyboard.on('keydown-UP', () => {
            this.langIndex = (this.langIndex - 1 + this.langs.length) % this.langs.length;
            this.updateLangSelection();
        });
        this.input.keyboard.on('keydown-DOWN', () => {
            this.langIndex = (this.langIndex + 1) % this.langs.length;
            this.updateLangSelection();
        });

        this.add.bitmapText(cx, 160, 'small_font', gm.t('back')).setOrigin(0.5, 0.5);
        this.input.keyboard.once('keydown-Z', () => {
            gm.lang = this.langs[this.langIndex];
            this.scene.start('TitleScreenScene');
        });
    }

    updateLangSelection() {
        this.langTexts.forEach((text, i) => {
            if (i === this.langIndex) {
                text.setText('> ' + this.langs[i] + ' <');
                text.setTint(0xFFD700);
            } else {
                text.setText(this.langs[i]);
                text.clearTint();
            }
        });
    }
}