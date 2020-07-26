

const Game = function (game) {
    this.players = [];
    this.ready = False;
    this.status = False;
};

// 2. Add the method to prototype
Game.prototype.addPlayer = function (player) {

    this.players.push(player);
};

module.exports = { Game };