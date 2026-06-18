import { Player } from '/src/entities/player.js';

export const CollisionType = {
    NONE: 0,
    COLLIDE: 1,
    ONE_WAY: 2,
    HURT: 3,
}

export class Terrain {
    constructor(scene, key) {
        this.scene = scene;

        this.tilemap = scene.add.tilemap('tilemap');
        const tilesetImage = this.tilemap.addTilesetImage(key, 'tiles');

        this.layer = this.tilemap.createLayer('Terrain', tilesetImage, 0, 0);
        this.tilemap.setCollisionBetween(1, 100, true, 'Terrain');

        this.width = this.tilemap.widthInPixels;
        this.height = this.tilemap.heightInPixels;

        this.layer.forEachTile(tile => {
            if (tile.properties.Collision == CollisionType.NONE) {
                tile.setCollision(false);
            }
        })
    }

    setCameraBounds() {
        this.scene.cameras.main.setBounds(16, 16, this.width - 32, this.height - 32);
        this.scene.physics.world.setBounds(16, 16, this.width - 32, this.height - 32);
    }

    addCollider(object, callback = null) {
        this.scene.physics.add.collider(object, this.layer, callback, (object, tile) => {
            switch(tile.properties.Collision) {
                case CollisionType.ONE_WAY:
                    return (
                        object.body.velocity.y > 0
                        && object.body.prev.y + object.body.height <= tile.getTop() + 6
                    );
                case CollisionType.HURT:
                    if (object instanceof Player) {
                        if (object.invincibilityFrames > 0) return true;
                        object.knockbackDirection = object.facingDirection * -1;
                        object.damage(1);
                        return false;
                    }
                    return true;
                default:
                    return true;
            }
        });
    }

    getObjectLayer() {
        return this.tilemap.getObjectLayer('Objects');
    }

    isWalkable(x, y) {
        const tile = this.layer.getTileAtWorldXY(x, y);
        return tile && tile?.properties.Collision !== CollisionType.NONE;
    }
}