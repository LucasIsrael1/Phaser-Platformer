export class Berry extends Phaser.Physics.Arcade.Sprite  {

    constructor(scene, x, y) {
        super(scene, x, y, 'berry');

        this.anims.play('berry');
    }

    onOverlap(player) {
        if (!this.active) return;
        this.scene.sound.play('fruta', { volume: 0.3 });
        this.scene.events.emit('update_berries', ++this.scene.gm.berries);
        this.disableBody(true, true);
    }
}