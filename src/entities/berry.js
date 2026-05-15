export class Berry extends Phaser.Physics.Arcade.Sprite  {

    constructor(scene, x, y) {
        super(scene, x, y, 'berry');
    }

    onOverlap(player) {
        console.log("AAA");
        this.disableBody(true, true);
    }
}