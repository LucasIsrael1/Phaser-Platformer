export class GameManager {
    // Status do jogador
    berries = 0;
    hp = 3;
    // Progresso
    level = 1;
    levelCount = 3;
    // Idioma
    lang = 'PT';

    constructor(scene) {
        this.scene = scene;
    }

    // Caminho do ficheiro com o tilemap
    getLevelPath() {
        return './assets/levels/level' + this.level + '.json';
    }

    // Obter texto traduzido
    t(key) {
        return this.translations[this.lang]?.[key] || this.translations['PT'][key] || key;
    }
}