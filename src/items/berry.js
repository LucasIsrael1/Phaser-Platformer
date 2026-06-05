export class Berry extends Phaser.Physics.Arcade.Sprite  {

    constructor(scene, x, y) {
        super(scene, x, y, 'berry');

        scene.anims.create({
            key: 'berry',
            frames: [
                { key: 'berry', frame: 0 },
                { key: 'berry', frame: 0 },
                { key: 'berry', frame: 1 },
                { key: 'berry', frame: 2 },
                { key: 'berry', frame: 2 },
                { key: 'berry', frame: 1 },
            ],
            frameRate: 5,
            repeat: -1
        });
        this.anims.play('berry');
    }

    onOverlap(player) {
        this.disableBody(true, true);
    }
}