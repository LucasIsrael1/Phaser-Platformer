export class GameManager {
    
    berries = 0;
    level = 2;

    constructor(scene) {
        this.scene = scene;
    }

    getLevelPath() {
        return '/assets/levels/level' + this.level  + '.json';
        // return '/assets/tilemaps/test.json'
    }
}