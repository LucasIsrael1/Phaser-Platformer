import { MenuManager } from '../managers/menu_manager.js';

export class LevelSelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LevelSelectScene' });
    }

    create() {
        const cx = this.cameras.main.width / 2;
        const gm = this.game.registry.get('game_manager');
        const t = (key) => gm.t(key);

        this.add.image(cx, 90, 'menu_bg').setOrigin(0.5, 0.5).setDepth(0);
        
        const titleText = t('select_level');
        this.add.bitmapText(cx, 30, 'big_font', titleText).setOrigin(0.5, 0.5);

        const menuItemsConfig = [];

        for (let i = 1; i <= gm.levelCount; i++) {
            const yPos = 74 + (i * 16);
            const textDisplay = this.add.bitmapText(cx, yPos, 'small_font', `${t('level')} ${i}`).setOrigin(0.5, 0.5);

            menuItemsConfig.push({
                onSelect: () => {
                    this.sound.stopAll();
                    gm.level = i;
                    this.scene.start('LevelScene');
                    this.scene.launch('HUDScene');
                },
                getLabel: () => `${t('level')} ${i}`,
                text: textDisplay
            });
        }

        const backYPos = 74 + ((gm.levelCount + 1) * 16);
        const backTextDisplay = this.add.bitmapText(cx, backYPos, 'small_font', t('back')).setOrigin(0.5, 0.5);
        
        menuItemsConfig.push({
            onSelect: () => {
                this.scene.start('TitleScreenScene');
            },
            getLabel: () => t('back'),
            text: backTextDisplay
        });

        this.menu = new MenuManager(this, menuItemsConfig);

        this.input.keyboard.on('keydown-X', () => {
            this.scene.start('TitleScreenScene');
        });
    }
}