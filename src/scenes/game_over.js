import { MenuManager } from '/src/managers/menu_manager.js';

export class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create() {
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        this.add.image(cx, 90, 'cave_bg').setOrigin(0.5, 0.5).setDepth(0);

        // Texto
        const gm = this.game.registry.get('game_manager');
        this.add.bitmapText(cx, cy - 40, 'big_font', gm.t('game_over')).setOrigin(0.5, 0.5);

        const restartText = this.add.bitmapText(cx, cy, 'small_font', gm.t('restart')).setOrigin(0.5, 0.5);
        const menuText = this.add.bitmapText(cx, cy + 20, 'small_font', gm.t('menu')).setOrigin(0.5, 0.5);

        const menuItemsConfig = [
            // Reiniciar
            {
                onSelect: () => {
                    this.sound.stopAll();

                    this.scene.stop('GameOverScene');
                    this.scene.stop('HUDScene');
                    
                    this.scene.start('LevelScene');
                    this.scene.launch('HUDScene');
                },
                getLabel: () => gm.t('restart'),
                text: restartText
            },
            // Voltar ao menu
            {
                onSelect: () => {
                    this.sound.stopAll();

                    this.scene.stop('GameOverScene');
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