import { MenuManager } from '../managers/menu_manager.js';

export class OptionsScene extends Phaser.Scene {
    constructor() { 
        super({ key: 'OptionsScene' }); 
    }

    create() {
        const cx = this.cameras.main.width / 2;
        const gm = this.game.registry.get('game_manager');

        this.add.image(cx, 90, 'menu_bg').setOrigin(0.5, 0.5).setDepth(0);

        this.title = this.add.bitmapText(cx, 30, 'big_font', gm.t('options')).setOrigin(0.5, 0.5);

        // Estado inicial
        this.langs = ['PT', 'EN', 'ES', 'FR'];
        this.langIndex = this.langs.indexOf(gm.lang);
        this.volume = Math.round(this.sound.volume * 10);

        // Textos
        const langText = this.add.bitmapText(cx, 90, 'small_font', '').setOrigin(0.5, 0.5);
        const volumeText = this.add.bitmapText(cx, 108, 'small_font', '').setOrigin(0.5, 0.5);
        const backText = this.add.bitmapText(cx, 126, 'small_font', '').setOrigin(0.5, 0.5);

        const menuItemsConfig = [
            // Idioma
            {
                decrease: () => {
                    this.langIndex = (this.langIndex - 1 + this.langs.length) % this.langs.length;
                    gm.lang = this.langs[this.langIndex];
                    this.title.setText(gm.t('options'));
                },
                increase: () => {
                    this.langIndex = (this.langIndex + 1) % this.langs.length;
                    gm.lang = this.langs[this.langIndex];
                    this.title.setText(gm.t('options'));
                },
                getLabel: () => `${gm.t('lang_label')}: ${this.langs[this.langIndex]}`,
                text: langText
            },
            // Volume
            {
                decrease: () => {
                    this.volume = Math.max(0, this.volume - 1);
                    this.sound.volume = this.volume / 10;
                },
                increase: () => {
                    this.volume = Math.min(10, this.volume + 1);
                    this.sound.volume = this.volume / 10;
                },
                getLabel: (isActive) => `${gm.t('volume')}: ${'[' + 'O'.repeat(this.volume) + '-'.repeat(10 - this.volume) + ']'}`,
                text: volumeText
            },
            // Voltar
            {
                onSelect: () => {
                    this.scene.start('TitleScreenScene');
                },
                getLabel: () => gm.t('back'),
                text: backText
            }
        ];

        this.menu = new MenuManager(this, menuItemsConfig);

        this.input.keyboard.on('keydown-X', () => {
            this.scene.start('TitleScreenScene');
        });
    }
}