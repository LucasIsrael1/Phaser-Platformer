import { TestScene } from '/src/scenes/test.js';
import { HUDScene } from "/src/scenes/HUDScene.js";

const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 180,
    scene: [TestScene, HUDScene],
    backgroundColor: '#88838b',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            // debug: true
        }
    },
    render: {
        antialias: false,
        roundPixels: true
    },
    scale: {
        zoom: 3
    },
};

console.log('Cenas registadas:', config.scene);
const game = new Phaser.Game(config);