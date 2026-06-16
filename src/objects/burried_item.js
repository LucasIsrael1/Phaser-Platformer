import { BurriedBerry } from "../items/burried_berry.js";
import { Rock } from "/src/items/rock.js";

export const ItemType = {
    BERRY: 0,
    ROCK: 1,
}

export class BurriedItem extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, itemType) {
        super(scene, x, y, 'burried_item');
        
        scene.add.existing(this);
        this.setDepth(15)
        
        this.itemType = itemType;
    }

    onOverlap(player, item) {
        if (player.heldItem || player.isDigging || !player.body.blocked.down) return;
        if (Phaser.Input.Keyboard.JustDown(player.keys.item)) {
            this.digUp(player);
        }
    }

    digUp(player) {
        player.setState('dig');
        player.facingDirection = Math.sign(this.x - player.x);
        this.scene.time.delayedCall(200, () => {this.finishDigging(player)});
    }

    finishDigging(player) {
        switch (this.itemType) {
            case ItemType.BERRY:
                this.spawnBerry(player);
                break;
            case ItemType.ROCK:
                this.spawnRock(player);
                break;
        }

        player.setState('play');
        this.destroy();
    }

    spawnBerry(player) {
        new BurriedBerry(this.scene, this.x, this.y);
    }

    spawnRock(player) {
        const rock = this.scene.rocks.create(this.x, this.y);
        player.heldItem = rock;
        rock.pickUp(player);
    }
}