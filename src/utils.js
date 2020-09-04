const RANGE = 5;

module.exports = {

    arePositionsInRange: function(pos1, pos2) {
        return Math.abs(pos1.x - pos2.x) < RANGE &&
        Math.abs(pos1.y - pos2.y) < RANGE &&
        Math.abs(pos1.z - pos2.z) < RANGE;
    },

    isValidSpectator: function(entity) {
        return this.isValidPlayer(entity) && entity.teamNumber === 1;
    },

    isValidPlayer: function(entity) {
        return entity.userId !== undefined && entity.userId !== null;
    },

    isSamePlayer: function(player1, player2) {
        return player1.userId === player2.userId;
    },

    newSpectator: function(spectator) {
        return {
            player: spectator,
            spectating: 0,
            invalid: 0
        };
    },

    findSpectating: function(spectator, players) {
        for (var player of players) {
            // Skip same and invalid players
            if (!this.isValidPlayer(player) || this.isSamePlayer(player, spectator)) {
                continue;
            }
    
            // If his position is within range of another player
            if (this.arePositionsInRange(player.position, spectator.position)) {
                return player;
            }
        }
    
        return null;
    }
}

