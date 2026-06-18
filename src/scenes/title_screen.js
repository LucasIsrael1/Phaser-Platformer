import { MenuManager } from '/src/managers/menu_manager.js';

export class TitleScreenScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScreenScene' });
    }

    create() {
        if (!this.sound.get('music') || !this.sound.get('music').isPlaying) {
            this.sound.add('music', { loop: true, volume: 0.5 }).play();
        }

        const gm = this.game.registry.get('game_manager');
        const t = (key) => gm.t(key);

        this.add.image(160, 90, 'menu_bg').setOrigin(0.5, 0.5).setDepth(0);

        this.add.bitmapText(160, 30, 'big_font', t('title')).setOrigin(0.5, 0.5);
        this.add.bitmapText(160, 50, 'small_font', t('subtitle')).setOrigin(0.5, 0.5);

        const menuKeys = ['play', 'controls', 'options', 'credits'];

        const menuItemsConfig = menuKeys.map((key, i) => {
            const text = this.add.bitmapText(160, 90 + i * 16, 'small_font', '').setOrigin(0.5, 0.5);
            
            return {
                onSelect: () => this.selectOption(i),
                text: text,
                getLabel: () => t(key),
            };
        });

        this.menu = new MenuManager(this, menuItemsConfig);
    }

    selectOption(index) {
        switch (index) {
            case 0:
                this.sound.stopAll();
                this.scene.start('LevelScene');
                this.scene.launch('HUDScene');
                break;

            case 1:
                this.scene.start('ControlsScene');
                break;

            case 2:
                this.scene.start('OptionsScene');
                break;
                
            case 3:
                this.scene.start('CreditsScene');
                break;
        }
    }
}