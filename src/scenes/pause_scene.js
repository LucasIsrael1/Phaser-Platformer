import { MenuManager } from '../managers/menu_manager.js';

export class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    create() {
        const gm = this.game.registry.get('game_manager');
        const cx = this.cameras.main.width / 2;
        const cy = this.cameras.main.height / 2;

        this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 0.6).setOrigin(0, 0);

        // Texto
        this.add.bitmapText(cx, cy - 30, 'big_font', gm.t('pause')).setOrigin(0.5, 0.5);

        const resumeText = this.add.bitmapText(cx, cy + 10, 'small_font', '').setOrigin(0.5, 0.5);
        const menuText = this.add.bitmapText(cx, cy + 30, 'small_font', '').setOrigin(0.5, 0.5);

        const menuOptions = [
            {
                text: resumeText,
                getLabel: () => gm.t('resume'),
                onSelect: () => {
                    this.resume();
                }
            },
            {
                text: menuText,
                getLabel: () => gm.t('menu'),
                onSelect: () => {
                    this.scene.stop('PauseScene');
                    this.scene.stop('HUDScene');
                    this.scene.stop('LevelScene');
                    this.scene.start('TitleScreenScene');
                }
            }
        ];

        this.menuManager = new MenuManager(this, menuOptions);

        this.input.keyboard.once('keydown-P', () => {
            this.resume();
        });
    }

    resume() {
        this.scene.stop('PauseScene');
        this.scene.resume('LevelScene');
        const LevelScene = this.scene.get('LevelScene');
        if (LevelScene.music) LevelScene.music.resume();
    }
}