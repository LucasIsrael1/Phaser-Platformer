import { Player } from '../entities/player.js';
import { Terrain } from '../objects/terrain.js';
import { Enemy } from '../entities/enemy.js';
import { Crab } from '../entities/crab.js';
import { Turtle } from '../entities/turtle.js';
import { Berry } from '../items/berry.js';
import { Rock } from '../items/rock.js';
import { BurriedItem, ItemType } from '../objects/burried_item.js';

export class LevelScene extends Phaser.Scene {
    constructor() {
        super('LevelScene');
    }

    preload() {
        // Carregar tilemap correspondente ao nível atual
        this.gm = this.game.registry.get('game_manager');
        this.levelKey = 'tilemap' + this.gm.level;

        this.load.tilemapTiledJSON(this.levelKey, this.gm.getLevelPath());
    }

    create() {
        const gm = this.game.registry.get('game_manager');

        // Restaurar vida após Game Over
        if (this.gm.hp <= 0) this.gm.hp = 3;

        this.terrain = new Terrain(this, 'Terrain');
        this.terrain.setCameraBounds();
        this.terrain.setBackground();

        this.player = new Player(this, 0, 0);
        this.add.existing(this.player);
        this.cameras.main.startFollow(this.player);

        // Tecla de pausa
        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        // Carregar objetos e colisões
        this.loadObjects();
        this.createOverlaps();

        // Música de fundo em loop
        this.music = this.sound.add('music', { loop: true, volume: 0.7 });
        this.gameOverMusic = this.sound.add('game_over', {volume: 0.7 });
        this.levelClearMusic = this.sound.add('victory', {volume: 0.7 });

        this.input.keyboard.once('keydown', () => {
            if (!this.music.isPlaying) this.music.play();
        });

        // Carregar interface
        this.scene.launch('HUDScene');
    }

    loadObjects() {
        // Obter camada de objetos do tilemap
        this.objectLayer = this.terrain.getObjectLayer();

        // Criar grupos de física
        this.berries = this.physics.add.staticGroup({classType: Berry});
        this.burriedItems = this.physics.add.staticGroup({classType: BurriedItem});

        this.enemies = this.physics.add.group({runChildUpdate: true});

        this.projectiles = this.physics.add.group({runChildUpdate: true});
        this.rocks = this.physics.add.group({runChildUpdate: true});
        
        // Iterar sobre objetos do tilemap
        this.objectLayer.objects.forEach(object => {
            // Ajustar offset
            object.x += 8;
            object.y -= 8;
            // Verificar tipo do objeto
            switch(object.type) {
                // Fruta
                case 'Berry':
                    this.berries.create(object.x, object.y);
                    break;
                // Item enterrado: considerar tipo do item
                case 'BurriedItem':
                    this.burriedItems.create(object.x, object.y + 5, object.properties[0].value);
                    break;
                // Carangueijo
                case 'Crab':
                    const crab = new Crab(this, object.x, object.y - 3);
                    this.enemies.add(crab);
                    break;
                // Tartaruga
                case 'Turtle':
                    const turtle = new Turtle(this, object.x, object.y - 3);
                    this.enemies.add(turtle);
                    break;
                // Ponto de início do nível
                case 'SpawnPoint':
                    this.player.setPosition(object.x, object.y - 4);
                    break;
                // Ponto de fim do nível
                case 'Cave':
                    this.cave = this.physics.add.staticImage(object.x, object.y - 7, 'cave');
                    this.add.existing(this.cave);
                    this.physics.add.overlap(this.player, this.cave, (player, cave) => player.setState('win'), null, this);
                    break;
            }
        });
    }

    createOverlaps() {
        this.terrain.addCollider(this.player);
        this.terrain.addCollider(this.enemies);
        this.terrain.addCollider(this.projectiles, (projectile, tile) => projectile.onCollide());

        this.physics.add.collider(this.enemies, this.player, null, (player, enemy) => enemy.handleCollision(player));

        this.physics.add.overlap(this.player, this.berries, (player, berry) => berry.onOverlap(), null, this);
        this.physics.add.overlap(this.player, this.burriedItems, (player, item) => item.onOverlap(player, item), null, this);

        this.physics.add.overlap(this.projectiles, this.berries, (projectile, berry) => berry.onOverlap(), null, this);
        this.physics.add.overlap(this.rocks, this.berries, (rock, berry) => berry.onOverlap(), null, this);

        // pedras a atingir inimigos
        this.physics.add.overlap(this.rocks, this.enemies, (rock, enemy) => rock.onHitEnemy(enemy), null, this);

        // tartarugas a atingir inimigos
        this.physics.add.overlap(this.projectiles, this.enemies, (projectile, enemy) => projectile.onHitEnemy(enemy), null, this);
    }


    update() {
        // Atualizar parallax do fundo
        const camX = this.cameras.main.scrollX;
        const camY = this.cameras.main.scrollY;

        this.sky.tilePositionX = camX * 0.05;
        this.sky.tilePositionY = camY * 0.1;

        if (this.hills) {
            this.hills.tilePositionX = camX * 0.5;
            this.hills.tilePositionY = camY * 0.5;
        }

        // Pausar jogo
        if (Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
            this.music.pause();
            this.scene.pause('LevelScene');
            this.scene.launch('PauseScene');
        }
    }

    // Carregar cena de Game Over
    playerDie() {
        this.scene.launch('GameOverScene');
        this.scene.stop();
        return;
    }
    
    // Carregar cena de vitória
    clearLevel() {
        this.scene.stop('HUDScene');

        if (this.gm.level >= this.gm.levelCount) {
            // Cena de conclusão caso seja o último nível
            this.scene.launch('EndScene');
        } else {
            this.scene.launch('WinScene');
        }

        this.scene.stop();
    }
}