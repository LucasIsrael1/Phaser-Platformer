import { TestScene } from '/src/scenes/test.js';
import { HUDScene } from "/src/scenes/hud.js";
import { GameOverScene } from "/src/scenes/game_over.js";
import { TitleScreenScene } from '/src/scenes/title_screen.js';
import { LoadingScene } from '/src/scenes/loading_scene.js';
import { GameManager } from '/src/managers/game_manager.js';
import { PauseScene } from '/src/scenes/pause_scene.js';
import { WinScene } from '/src/scenes/win_scene.js';

const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 180,
    scene: [LoadingScene, TitleScreenScene, TestScene, HUDScene, GameOverScene, PauseScene, WinScene],
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
const gm = new GameManager();
game.registry.set('game_manager', gm);