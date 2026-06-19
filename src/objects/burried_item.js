import { BurriedBerry } from "../items/burried_berry.js";
import { Rock } from "../items/rock.js";
import { BurriedFish } from "../items/burried_fish.js";

// Tipo de item escavado
export const ItemType = {
    BERRY: 0,
    ROCK: 1,
    FISH: 2,
}

export class BurriedItem extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, itemType) {
        super(scene, x, y, 'burried_item');
        
        scene.add.existing(this);
        this.setDepth(15)
        
        this.itemType = itemType;
    }

    onOverlap(player, item) {
        // Verificar se jogador pode escavar
        if (player.heldItem || !player.stateName == 'play' || !player.body.blocked.down) return;
        if (Phaser.Input.Keyboard.JustDown(player.keys.item)) {
            this.digUp(player);
        }
    }

    // Definir estado do jogador e agendar fim da escavação
    digUp(player) {
        player.setState('dig');
        player.facingDirection = Math.sign(this.x - player.x);
        this.scene.time.delayedCall(200, () => {this.finishDigging(player)});
    }

    // Criar item escavado
    finishDigging(player) {
        // Verificar tipo de item
        switch (this.itemType) {
            // Fruta
            case ItemType.BERRY:
                this.spawnBerry(player);
                break;
            // Pedra
            case ItemType.ROCK:
                this.spawnRock(player);
                break;
            // Peixe
            case ItemType.FISH:
                this.spawnFish(player);
                break;
        }
        // Resumir gameplay normal
        player.setState('play');
        // Destruir objeto
        this.destroy();
    }

    spawnBerry(player) {
        new BurriedBerry(this.scene, this.x, this.y);
    }

    spawnRock(player) {
        // Criar rocha e fazer o jogador apanhá-la
        const rock = new Rock(this.scene, this.x, this.y)
        this.scene.rocks.add(rock);
        player.heldItem = rock;
        rock.pickUp(player);
    }

    spawnFish(player) {
        new BurriedFish(this.scene, this.x, this.y);
    }
}