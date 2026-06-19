import { LevelScene } from './scenes/level_scene.js';
import { HUDScene } from "./scenes/hud.js";
import { GameOverScene } from "./scenes/game_over.js";
import { TitleScreenScene } from './scenes/title_screen.js';
import { LevelSelectScene } from './scenes/level_select_scene.js';
import { LoadingScene } from './scenes/loading_scene.js';
import { GameManager } from './managers/game_manager.js';
import { PauseScene } from './scenes/pause_scene.js';
import { WinScene } from './scenes/win_scene.js';
import { EndScene } from './scenes/end_scene.js';
import { ControlsScene } from './scenes/controls_scene.js';
import { OptionsScene } from './scenes/options_scene.js';
import { CreditsScene } from './scenes/credits_scene.js';

const config = {
    type: Phaser.AUTO,
    width: 320,
    height: 180,
    scene: [
        LoadingScene, TitleScreenScene, LevelSelectScene, LevelScene, HUDScene, GameOverScene, PauseScene, WinScene, EndScene, ControlsScene, OptionsScene, CreditsScene],
    backgroundColor: '#000',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
        }
    },
    render: {
        antialias: false,
        pixelArt: true,
        roundPixels: true
    },
    scale: {
        zoom: 3
    },
};

const game = new Phaser.Game(config);
const gm = new GameManager();
game.registry.set('game_manager', gm);