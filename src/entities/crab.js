import { Enemy } from "./enemy.js";

export class Crab extends Enemy  {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'crab', -30, {x: 6, y: 12, w: 12, h: 11});

        scene.anims.create({
            key: 'crab_move',
            frames: [
                { key: 'crab', frame: 0 },
                { key: 'crab', frame: 1 },
            ],
            frameRate: 5,
            repeat: -1
        });
        this.anims.play('crab_move');
    }
}   