export default (anims) => {
    // Player
    anims.create({
        key: 'player_idle',
        frames: [
            { key: 'player', frame: 0 },
        ],
        frameRate: 10,
    });

    anims.create({
        key: 'player_walk',
        frames: [
            { key: 'player', frame: 0 },
            { key: 'player', frame: 1 },
            { key: 'player', frame: 0 },
            { key: 'player', frame: 2 },
        ],
        frameRate: 5,
        repeat: -1
    });

    anims.create({
        key: 'player_jump',
        frames: [
            { key: 'player', frame: 3 },
        ],
        frameRate: 10,
    });

    anims.create({
        key: 'player_fall',
        frames: [
            { key: 'player', frame: 4 },
        ],
        frameRate: 10,
    });

    anims.create({
        key: 'player_turn',
        frames: [
            { key: 'player', frame: 5 },
        ],
        frameRate: 10,
    });

    anims.create({
        key: 'player_dig',
        frames: [
            { key: 'player', frame: 6 },
        ],
        frameRate: 10,
    });

    anims.create({
        key: 'player_dig_finish',
        frames: [
            { key: 'player', frame: 7 },
        ],
        frameRate: 10,
    });

    anims.create({
        key: 'player_carry_idle',
        frames: [
            { key: 'player', frame: 8 },
        ],
        frameRate: 10,
    });

    anims.create({
        key: 'player_carry_walk',
        frames: [
            { key: 'player', frame: 8 },
            { key: 'player', frame: 9 },
            { key: 'player', frame: 8 },
            { key: 'player', frame: 10 },
        ],
        frameRate: 5,
        repeat: -1
    });

    anims.create({
        key: 'player_carry_jump',
        frames: [
            { key: 'player', frame: 11 },
        ],
        frameRate: 10,
    });

    anims.create({
        key: 'player_carry_fall',
        frames: [
            { key: 'player', frame: 12 },
        ],
        frameRate: 10,
    });

    anims.create({
        key: 'player_carry_turn',
        frames: [
            { key: 'player', frame: 13 },
        ],
        frameRate: 10,
    });

    anims.create({
        key: 'player_throw',
        frames: [
            { key: 'player', frame: 14 },
        ],
        frameRate: 10,
    });

    anims.create({
        key: 'player_damage',
        frames: [
            { key: 'player', frame: 16 },
        ],
        frameRate: 10,
    });

    anims.create({
        key: 'player_defeat',
        frames: [
            { key: 'player', frame: 17 },
        ],
        frameRate: 10,
    });

    // Berry

    anims.create({
        key: 'berry',
        frames: [
            { key: 'berry', frame: 0 },
            { key: 'berry', frame: 0 },
            { key: 'berry', frame: 1 },
            { key: 'berry', frame: 2 },
            { key: 'berry', frame: 2 },
            { key: 'berry', frame: 1 },
        ],
        frameRate: 5,
        repeat: -1
    });

    // Enemies

    anims.create({
        key: 'crab_move',
        frames: [
            { key: 'crab', frame: 0 },
            { key: 'crab', frame: 1 },
        ],
        frameRate: 5,
        repeat: -1
    });

    anims.create({
        key: 'turtle_move',
        frames: [
            { key: 'turtle', frame: 0 },
            { key: 'turtle', frame: 1 },
            { key: 'turtle', frame: 0 },
            { key: 'turtle', frame: 2 },
        ],
        frameRate: 5,
        repeat: -1
    });
}