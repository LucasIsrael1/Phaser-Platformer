export class Berry extends Phaser.Physics.Arcade.Sprite  {

    constructor(scene, x, y) {
        super(scene, x, y, 'berry');
    }

    onOverlap(player) {
        this.disableBody(true, true);
    }
}