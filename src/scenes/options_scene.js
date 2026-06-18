export class OptionsScene extends Phaser.Scene {
    constructor() { super({ key: 'OptionsScene' }); }

    create() {
        const cx = this.cameras.main.width / 2;
        const gm = this.game.registry.get('game_manager');

        this.cameras.main.setBackgroundColor('#96aaff');
        this.add.bitmapText(cx, 15, 'big_font', gm.t('options')).setOrigin(0.5, 0.5);

        // Língua
        this.add.bitmapText(cx, 50, 'small_font', gm.t('lang_label')).setOrigin(0.5, 0.5);
        this.langs = ['PT', 'EN', 'ES', 'FR'];
        this.langIndex = this.langs.indexOf(gm.lang);
        this.langTexts = [];
        this.langs.forEach((lang, i) => {
            const text = this.add.bitmapText(cx, 65 + i * 14, 'small_font', lang).setOrigin(0.5, 0.5);
            this.langTexts.push(text);
        });
        this.updateLangSelection();

        // Volume
        this.volume = Math.round(this.sound.volume * 10);
        this.add.bitmapText(cx, 130, 'small_font', gm.t('volume')).setOrigin(0.5, 0.5);
        this.volumeText = this.add.bitmapText(cx, 145, 'small_font', this.getVolumeBar())
            .setOrigin(0.5, 0.5);

        this.add.bitmapText(cx, 168, 'small_font', gm.t('back')).setOrigin(0.5, 0.5);

        // Língua com setas cima/baixo
        this.input.keyboard.on('keydown-UP', () => {
            this.langIndex = (this.langIndex - 1 + this.langs.length) % this.langs.length;
            this.updateLangSelection();
        });
        this.input.keyboard.on('keydown-DOWN', () => {
            this.langIndex = (this.langIndex + 1) % this.langs.length;
            this.updateLangSelection();
        });

        // Volume com setas esquerda/direita
        this.input.keyboard.on('keydown-LEFT', () => {
            this.volume = Math.max(0, this.volume - 1);
            this.sound.volume = this.volume / 10;
            this.volumeText.setText(this.getVolumeBar());
        });
        this.input.keyboard.on('keydown-RIGHT', () => {
            this.volume = Math.min(10, this.volume + 1);
            this.sound.volume = this.volume / 10;
            this.volumeText.setText(this.getVolumeBar());
        });

        this.input.keyboard.once('keydown-Z', () => {
            gm.lang = this.langs[this.langIndex];
            this.scene.start('TitleScreenScene');
        });
    }

    getVolumeBar() {
        const pct = this.volume * 10;
        const bar = 'O'.repeat(this.volume) + '.'.repeat(10 - this.volume);
        const left = this.volume > 0 ? '(' : ' ';
        const right = this.volume < 10 ? ')' : ' ';
        return left + bar + right + ' ' + pct + '.';
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