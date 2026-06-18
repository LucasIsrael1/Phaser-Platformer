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
        this.cameras.main.setBackgroundColor('#000000');

        this.add.bitmapText(160, 30, 'big_font', t('title')).setOrigin(0.5, 0.5);
        this.add.bitmapText(160, 50, 'small_font', t('subtitle')).setOrigin(0.5, 0.5);

        this.selectedIndex = 0;
        this.menuKeys = ['play', 'controls', 'options', 'credits'];
        this.menuItems = [];

        this.menuKeys.forEach((key, i) => {
            const text = this.add.bitmapText(160, 80 + i * 22, 'small_font', t(key)).setOrigin(0.5, 0.5);
            this.menuItems.push(text);
        });

        this.updateSelection();

        this.input.keyboard.on('keydown-UP', () => {
            this.selectedIndex = (this.selectedIndex - 1 + this.menuKeys.length) % this.menuKeys.length;
            this.updateSelection();
        });
        this.input.keyboard.on('keydown-DOWN', () => {
            this.selectedIndex = (this.selectedIndex + 1) % this.menuKeys.length;
            this.updateSelection();
        });
        this.input.keyboard.on('keydown-Z', () => this.selectOption());
        this.input.keyboard.on('keydown-ENTER', () => this.selectOption());
    }

    updateSelection() {
        const gm = this.game.registry.get('game_manager');
        this.menuKeys.forEach((key, i) => {
            const label = gm.t(key);
            if (i === this.selectedIndex) {
                this.menuItems[i].setText('> ' + label + ' <');
                this.menuItems[i].setTint(0xFFD700);
            } else {
                this.menuItems[i].setText(label);
                this.menuItems[i].clearTint();
            }
        });
    }

    selectOption() {
        switch (this.selectedIndex) {
            case 0:
                this.sound.stopAll();
                this.scene.start('TestScene');
                this.scene.launch('HUDScene');
                break;
            case 1: this.scene.start('ControlsScene'); break;
            case 2: this.scene.start('OptionsScene'); break;
            case 3: this.scene.start('CreditsScene'); break;
        }
    }
}