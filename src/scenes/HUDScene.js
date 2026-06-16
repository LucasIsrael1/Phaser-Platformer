export class HUDScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HUDScene' });
    }

    create() {
        // Fundo semi-transparente — largura ajustada
        this.add.rectangle(0, 0, 105, 26, 0x000000, 0.35).setOrigin(0, 0);

        // Ícone da berry
        const berryIcon = this.add.sprite(14, 13, 'berry').setOrigin(0.5, 0.5);
        
        // Texto do contador de berries
        this.berryText = this.add.text(24, 13, 'x0', {
            fontSize: '12px',
            fill: '#ffffff',
            fontFamily: 'monospace',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0, 0.5);

        // Ícone do coração
        this.add.image(60, 13, 'heart').setOrigin(0.5, 0.5);

        // Texto do contador de vidas
        this.livesText = this.add.text(70, 13, 'x3', {
            fontSize: '12px',
            fill: '#ffffff',
            fontFamily: 'monospace',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0, 0.5);

        this.berryCount = 0;

        // Remover listeners antigos antes de adicionar novos
        const gameScene = this.scene.get('TestScene');
        gameScene.events.off('berryCollected');
        gameScene.events.off('updateLives');

        gameScene.events.on('berryCollected', () => {
            this.berryCount++;
            this.berryText.setText('x' + this.berryCount);
        });
        gameScene.events.on('updateLives', (lives) => {
            this.livesText.setText('x' + lives);
        });
    }
}