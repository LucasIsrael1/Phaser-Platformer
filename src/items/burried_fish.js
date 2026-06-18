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
                    const gameManager = scene.registry.get('game_manager');
                    const player = scene.player;
                    if (player.hp < 3) {
                        player.hp++;
                        scene.events.emit('update_hearts', player.hp);
                    }
                    scene.sound.play('fruta', { volume: 0.7 });
                    this.destroy();
                });
            }
        });
    }
}