import { Enemy } from "./enemy.js";

export class Crab extends Enemy  {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'crab', 40, {x: 6, y: 12, w: 12, h: 11});

        this.anims.play('crab_move');
    }
}   