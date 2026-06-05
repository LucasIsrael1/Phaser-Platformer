export class BurriedBerry extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'berry');
        scene.add.existing(this);
        this.setDepth(15);

        const tween = scene.tweens.add({
            targets: this,
            
            y: this.y - 30,
            ease: 'Cubic',
            duration: 500,

            onComplete: () => {
                this.scene.time.delayedCall(100, () => {
                    this.destroy();
                });
            }
        })
    }
}