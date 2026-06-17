import { TestScene } from '/src/scenes/test.js';
import { HUDScene } from "/src/scenes/hud.js";
import { GameOverScene } from "/src/scenes/GameOverScene.js";
import { GameManager } from '/src/managers/game_manager.js';

const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 180,
    scene: [TestScene, HUDScene, GameOverScene],
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
game.registry.set('game_manager', new GameManager());