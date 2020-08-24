
const { Player } = require('./player.model');
const { randomTetromino } = require('../utils/tetrominos');

class Game {
    constructor(game) {
        this.players = game.players || [];
        this.room = game.room || '';
        this.ready = game.ready || false;
        this.started = game.status || false;
        this.tetrominos = game.tetrominos || [];
    };

    update(props) {

        this.players = props.players || this.players;
        this.room = props.room || this.room;
        this.ready = props.ready || this.ready;
        this.started = props.started || this.started;
    };

    findPlayer(id) {
        const i = this.players.findIndex(player => player.id === id);
        return this.players[i];
    }


    addPlayer(player) {
        this.players.push(player);
    };

    getTwoTetrominos(turn) {
        // Given a turn return the current and next tetrominos.
        // If not enough tetrominos in array, creates new.
        while (turn >= this.tetrominos.length) {
            this.tetrominos.push(randomTetromino());
        };

        return this.tetrominos.slice(turn - 1, turn + 1);
    }

};


module.exports = { Game };