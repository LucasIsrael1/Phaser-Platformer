export class MenuManager {
    constructor(scene, options) {
        this.scene = scene;
        this.options = options;
        this.selectedIndex = 0;

        this.setupInputs();
        this.updateMenu();
    }

    setupInputs() {
        // Teclas
        this.keys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.UP,
            down: Phaser.Input.Keyboard.KeyCodes.DOWN,
            left: Phaser.Input.Keyboard.KeyCodes.LEFT,
            right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
            confirm: Phaser.Input.Keyboard.KeyCodes.Z,
            cancel: Phaser.Input.Keyboard.KeyCodes.X,
        });

        // Navegação
        this.keys.up.on('down', () => { this.navigate(-1) });
        this.keys.down.on('down', () => { this.navigate(1) });

        this.keys.left.on('down', () => { this.change(-1) });
        this.keys.right.on('down', () => { this.change(1) });

        // Seleção
        this.keys.confirm.on('down', () => { this.select() });
    }

    navigate(direction) {
        this.selectedIndex = (this.selectedIndex + direction + this.options.length) % this.options.length;
        this.updateMenu();
    }

    change(direction) {
        const currentItem = this.options[this.selectedIndex];
        if (direction === -1 && currentItem.decrease) {
            currentItem.decrease();
            this.updateMenu();
        } else if (direction === 1 && currentItem.increase) {
            currentItem.increase();
            this.updateMenu();
        }
    }

    select() {
        const currentItem = this.options[this.selectedIndex];
        if (currentItem.onSelect) {
            currentItem.onSelect();
        }
    }

    updateMenu() {
        this.options.forEach((option, index) => {
            const isActive = (index === this.selectedIndex);
            if (option.text) {
                if (isActive) {
                    option.text.setText(`<${option.getLabel()}>`).setTint(0xFFD700);
                } else {
                    option.text.setText(option.getLabel()).clearTint();
                }
            }
        });
    }
}