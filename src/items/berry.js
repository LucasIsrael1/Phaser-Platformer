export class Berry extends Phaser.Physics.Arcade.Sprite  {

    constructor(scene, x, y) {
        super(scene, x, y, 'berry');

        this.anims.play('berry');
    }

    onOverlap(player) {
        if (!this.active) return;
        const gameManager = this.scene.registry.get('game_manager');
        this.scene.sound.play('fruta', { volume: 0.3 });
        this.scene.events.emit('update_berries', ++gameManager.berries);
        this.disableBody(true, true);
    }
}