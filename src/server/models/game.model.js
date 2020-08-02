
class Game {
    constructor(game) {
        this.players = game.players || [];
        this.room = game.room || '';
        this.ready = game.ready || false;
        this.status = game.status || false;
    };

    update(props) {

        this.players = props.players || this.players;
        this.room = props.room || this.room;
        this.ready = props.ready || this.ready;
        this.status = props.status || this.status;
    };

    addPlayer(player) {
        this.players.push(player);
    };

};


module.exports = { Game };