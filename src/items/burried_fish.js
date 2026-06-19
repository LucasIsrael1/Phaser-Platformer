export class BurriedFish extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'fish');
        scene.add.existing(this);
        this.setDepth(15);

        scene.tweens.add({
            targets: this,
            y: this.y - 30,
            ease: 'Cubic',
            duration: 500,
            onComplete: () => {
                scene.time.delayedCall(100, () => {
                    if (this.scene.gm.hp < 3) {
                        this.scene.gm.hp++;
                        scene.events.emit('update_hearts', this.scene.gm.hp);
                    }
                    scene.sound.play('fruta', { volume: 0.3 });
                    this.destroy();
                });
            }
        });
    }
}