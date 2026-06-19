import { Player } from '../entities/player.js';

// Tipos de colisão
export const CollisionType = {
    NONE: 0,
    COLLIDE: 1,
    ONE_WAY: 2,
    HURT: 3,
}

// Tipos de fundo
const skyTypes = [
    'day',
    'cave',
    'afternoon',
];

export class Terrain {
    constructor(scene, key) {
        this.scene = scene;

        // Criar tilemap
        this.tilemap = scene.add.tilemap(scene.levelKey);
        const tilesetImage = this.tilemap.addTilesetImage(key, 'tiles');

        // Camada de terreno
        this.layer = this.tilemap.createLayer('Terrain', tilesetImage, 0, 0);
        this.tilemap.setCollisionBetween(1, 100, true, 'Terrain');

        this.width = this.tilemap.widthInPixels;
        this.height = this.tilemap.heightInPixels;

        // Remover colisão de tiles atravessáveis
        this.layer.forEachTile(tile => {
            if (tile.properties.Collision == CollisionType.NONE) {
                tile.setCollision(false);
            }
        })
    }

    // Definir área da câmera e limites do mapa
    setCameraBounds() {
        // Margem de um tile acima e abaixo da visão da câmera
        this.scene.cameras.main.setBounds(0, 16, this.width, this.height - 32);
        this.scene.physics.world.setBounds(0, 0, this.width, this.height);
    }

    // Tipos diferentes de colisões
    addCollider(object, callback = null) {
        this.scene.physics.add.collider(object, this.layer, callback, (object, tile) => {
            // Verificar tipo de colisão
            switch(tile.properties.Collision) {
                // Plataformas semi-sólidas
                case CollisionType.ONE_WAY:
                    return (
                        // Sólida se objeto está acima da plataforma e a descer 
                        object.body.velocity.y > 0
                        && object.body.prev.y + object.body.height <= tile.getTop() + 6
                    );
                // Causar dano (espinhos)
                case CollisionType.HURT:
                    // Apenas causa dano a jogador
                    if (object instanceof Player) {
                        if (object.invincibilityFrames > 0) return true;
                        object.knockbackDirection = object.facingDirection * -1;
                        object.damage(1);
                        // Não é sólido durante o dano, para permitir o knockback
                        return false;
                    }
                    return true;
                // Restantes tiles são sólidos
                default:
                    return true;
            }
        });
    }

    getObjectLayer() {
        return this.tilemap.getObjectLayer('Objects');
    }

    setBackground() {
        const skyType = skyTypes[this.tilemap.properties[0].value]

        this.scene.sky = this.scene.add.tileSprite(0, 0, this.scene.scale.width, 180, 'sky_' + skyType)
            .setOrigin(0, 0).setScrollFactor(0).setDepth(-1);
        
        if (skyType !== 'cave') {
            this.scene.hills = this.scene.add.tileSprite(0, 0, this.scene.scale.width, 180, 'hills_' + skyType)
            .setOrigin(0, 0).setScrollFactor(0).setDepth(-1);
        }
    }

    isWalkable(x, y) {
        const tile = this.layer.getTileAtWorldXY(x, y);
        return tile && tile?.properties.Collision !== CollisionType.NONE;
    }
}