import { TestScene } from '/src/scenes/test.js';

const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 180,
    scene: TestScene,
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

const game = new Phaser.Game(config);