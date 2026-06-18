const MENU_ITEMS = ['JOGAR', 'CONTROLOS', 'OPCOES', 'CREDITOS'];

export class TitleScreenScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScreenScene' });
    }

    create() {
        const cx = this.cameras.main.width / 2;
        this.add.image(160, 90, 'menu_bg').setOrigin(0.5, 0.5).setDepth(0);
        this.cameras.main.setBackgroundColor('#000000');

        // título
        this.add.bitmapText(cx, 30, 'big_font', 'OTTER ISLAND').setOrigin(0.5, 0.5);
        this.add.bitmapText(cx, 50, 'small_font', 'A AVENTURA DA LONTRA').setOrigin(0.5, 0.5);

        // opções do menu
        this.selectedIndex = 0;
        this.menuItems = [];

        MENU_ITEMS.forEach((item, i) => {
            const text = this.add.bitmapText(cx, 80 + i * 22, 'small_font', item).setOrigin(0.5, 0.5);
            this.menuItems.push(text);
        });

        this.updateSelection();

        // teclas
        this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            confirm: Phaser.Input.Keyboard.KeyCodes.Z,
        });

        this.input.keyboard.on('keydown-UP', () => {
            this.selectedIndex = (this.selectedIndex - 1 + MENU_ITEMS.length) % MENU_ITEMS.length;
            this.updateSelection();
        });

        this.input.keyboard.on('keydown-DOWN', () => {
            this.selectedIndex = (this.selectedIndex + 1) % MENU_ITEMS.length;
            this.updateSelection();
        });

        this.input.keyboard.on('keydown-Z', () => {
            this.selectOption();
        });

        this.input.keyboard.on('keydown-ENTER', () => {
            this.selectOption();
        });
    }

    updateSelection() {
        this.menuItems.forEach((item, i) => {
            if (i === this.selectedIndex) {
                item.setText('> ' + MENU_ITEMS[i] + ' <');
                item.setTint(0xFFD700);
            } else {
                item.setText(MENU_ITEMS[i]);
                item.clearTint();
            }
        });
    }

    selectOption() {
        switch (this.selectedIndex) {
            case 0:
                this.scene.start('TestScene');
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