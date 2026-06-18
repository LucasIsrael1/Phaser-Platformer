export class GameManager {
    
    berries = 0;
    level = 1;

    constructor(scene) {
        this.scene = scene;
    }

    getLevelPath() {
        return '/assets/levels/level' + this.level  + '.json';
    }
}