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
        return translations[this.lang]?.[key] || translations['PT'][key] || key;
    }
}

const translations = {
    PT: {
        title: 'OTTER ISLAND',
        subtitle: 'A AVENTURA DA LONTRA',
        play: 'JOGAR',
        controls: 'CONTROLOS',
        options: 'OPCOES',
        credits: 'CREDITOS',
        back: 'PRIMA Z PARA VOLTAR',
        lang_label: 'LINGUA',
        controls_move: '[SETAS]  MOVER',
        controls_jump: '[Z]      SALTAR',
        controls_run: '[X]      CORRER',
        controls_action: '[A]      APANHAR. ATIRAR. ESCAVAR',
        controls_pause: '[P]      PAUSAR',
        credits_by: 'DESENVOLVIDO POR',
        credits_engine: 'FEITO COM PHASER 3',
        credits_school: 'ESTG. IPVC 2025.2026',
        game_over: 'FIM DE JOGO',
        restart: 'PRIMA [R] PARA JOGAR DE NOVO.',
        win: 'NIVEL COMPLETO',
        pause: 'PAUSA',
        resume: 'PRIMA [P] PARA CONTINUAR',
    },
    EN: {
        title: 'OTTER ISLAND',
        subtitle: 'THE OTTER ADVENTURE',
        play: 'PLAY',
        controls: 'CONTROLS',
        options: 'OPTIONS',
        credits: 'CREDITS',
        back: 'PRESS Z TO GO BACK',
        lang_label: 'LANGUAGE',
        controls_move: '[ARROWS] MOVE',
        controls_jump: '[Z]      JUMP',
        controls_run: '[X]      RUN',
        controls_action: '[A]      GRAB. THROW. DIG',
        controls_pause: '[P]      PAUSE',
        credits_by: 'DEVELOPED BY',
        credits_engine: 'MADE WITH PHASER 3',
        credits_school: 'ESTG. IPVC 2025.2026',
        game_over: 'GAME OVER',
        restart: 'PRESS [R] TO PLAY AGAIN.',
        win: 'LEVEL COMPLETE',
        pause: 'PAUSE',
        resume: 'PRESS [P] TO CONTINUE',
    },

    ES: {
        title: 'OTTER ISLAND',
        subtitle: 'LA AVENTURA DE LA NUTRIA',
        play: 'JUGAR',
        controls: 'CONTROLES',
        options: 'OPCIONES',
        credits: 'CREDITOS',
        back: 'PULSA Z PARA VOLVER',
        lang_label: 'IDIOMA',
        controls_move: '[FLECHAS] MOVER',
        controls_jump: '[Z]       SALTAR',
        controls_run: '[X]       CORRER',
        controls_action: '[A]       COGER. LANZAR. CAVAR',
        controls_pause: '[P]       PAUSAR',
        credits_by: 'DESARROLLADO POR',
        credits_engine: 'HECHO CON PHASER 3',
        credits_school: 'ESTG. IPVC 2025.2026',
        game_over: 'FIN DEL JUEGO',
        restart: 'PULSA [R] PARA JUGAR DE NUEVO.',
        win: 'NIVEL COMPLETADO',
        pause: 'PAUSA',
        resume: 'PULSA [P] PARA CONTINUAR',
    },
    
    FR: {
        title: 'OTTER ISLAND',
        subtitle: 'L AVENTURE DE LA LOUTRE',
        play: 'JOUER',
        controls: 'CONTROLES',
        options: 'OPTIONS',
        credits: 'CREDITS',
        back: 'APPUIE SUR Z POUR REVENIR',
        lang_label: 'LANGUE',
        controls_move: '[FLECHES] DEPLACER',
        controls_jump: '[Z]       SAUTER',
        controls_run: '[X]       COURIR',
        controls_action: '[A]       PRENDRE. LANCER. CREUSER',
        controls_pause: '[P]       PAUSE',
        credits_by: 'DEVELOPPE PAR',
        credits_engine: 'FAIT AVEC PHASER 3',
        credits_school: 'ESTG. IPVC 2025.2026',
        game_over: 'FIN DE LA PARTIE',
        restart: 'APPUIE SUR [R] POUR REJOUER.',
        win: 'NIVEAU TERMINE',
        pause: 'PAUSE',
        resume: 'APPUIE SUR [P] POUR CONTINUER',
    },
};