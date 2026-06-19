export class Berry extends Phaser.Physics.Arcade.Sprite  {

    constructor(scene, x, y) {
        super(scene, x, y, 'berry');

        this.anims.play('berry');
    }

    // Coletar quando em contato com jogador
    onOverlap(player) {
        if (!this.active) return;
        this.scene.sound.play('berry', { volume: 0.3 });
        // Incrementar valor e emitir evento
        this.scene.events.emit('update_berries', ++this.scene.gm.berries);
        // Destruir
        this.disableBody(true, true);
    }
}