export class GameManager {
    berries = 0;
    level = 1;
    lang = 'PT';

    constructor(scene) {
        this.scene = scene;
    }

    getLevelPath() {
        return '/assets/levels/level' + this.level + '.json';
    }

    t(key) {
        return this.translations[this.lang]?.[key] || this.translations['PT'][key] || key;
    }
}