import { MenuManager } from '/src/managers/menu_manager.js';

export class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EndScene' });
    }

    create() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        this.add.image(cx, 90, 'menu_bg').setOrigin(0.5, 0.5).setDepth(0);

        const gm = this.game.registry.get('game_manager');
        this.add.bitmapText(cx, cy - 40, 'big_font', gm.t('congratulations')).setOrigin(0.5, 0.5);

        const nextLevelText = this.add.bitmapText(cx, cy, 'small_font', gm.t('won_all_levels')).setOrigin(0.5, 0.5);
        const menuText = this.add.bitmapText(cx, cy + 20, 'small_font', gm.t('menu_press')).setOrigin(0.5, 0.5);

        this.input.keyboard.on('keydown-Z', () => {
            this.scene.start('TitleScreenScene');
        });
    }
}