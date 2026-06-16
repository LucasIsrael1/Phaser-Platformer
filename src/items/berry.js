export class Berry extends Phaser.Physics.Arcade.Sprite  {

    constructor(scene, x, y) {
        super(scene, x, y, 'berry');

        this.anims.play('berry');
    }

    onOverlap(player) {
        if (!this.active) return;
        this.scene.events.emit('berryCollected');
        this.disableBody(true, true);
    }
}