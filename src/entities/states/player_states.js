export const States = {
    'play': {
        update: (player, time, delta, inputDirection) => {
            player.handleJumping(delta);
            player.handleMoving(inputDirection);
            if (player.heldItem) player.handleHeldItem();
            player.updateAnimations(inputDirection, delta);
        }
    },
    'dig': {
        enter: (player) => {
            player.body.setVelocity(0, 0);
            player.body.setAcceleration(0, 0);
            player.anims.play('player_dig');
        }
    }
}