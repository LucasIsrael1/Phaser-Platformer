import { MenuManager } from '../managers/menu_manager.js';

export class WinScene extends Phaser.Scene {
    constructor() {
        super({ key: 'WinScene' });
    }

    create() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        this.add.image(cx, 90, 'cave_bg').setOrigin(0.5, 0.5).setDepth(0);

        // Texto
        const gm = this.game.registry.get('game_manager');
        this.add.bitmapText(cx, cy - 40, 'big_font', gm.t('win')).setOrigin(0.5, 0.5);

        const nextLevelText = this.add.bitmapText(cx, cy, 'small_font', gm.t('next_level')).setOrigin(0.5, 0.5);
        const menuText = this.add.bitmapText(cx, cy + 20, 'small_font', gm.t('menu')).setOrigin(0.5, 0.5);

        const menuItemsConfig = [
            // Próximo nível
            {
                onSelect: () => {
                    this.scene.stop('WinScene');
                    this.scene.stop('HUDScene');

                    gm.level += 1;
                    
                    if (gm.level > gm.levelCount) {
                        this.scene.start('WinScene');
                        return;
                    } 
                    
                    this.scene.start('LevelScene');
                    this.scene.launch('HUDScene');
                },
                getLabel: () => gm.t('next_level'),
                text: nextLevelText
            },
            // Voltar ao menu
            {
                onSelect: () => {
                    this.scene.stop('WinScene');
                    this.scene.stop('HUDScene');                   
                    this.scene.start('TitleScreenScene');
                },
                getLabel: () => gm.t('menu'),
                text: menuText
            }
        ];

        this.menu = new MenuManager(this, menuItemsConfig);
    }
}