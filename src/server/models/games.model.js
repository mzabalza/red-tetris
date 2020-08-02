
const { Game } = require('./game.model');

class Games {

    constructor() {
        this.games = [];
    };

    addGame(game) {
        this.games.push(game);

    };

    addPlayer(room, username) {
        const id = this.games.findIndex(game => game.room == room);

        let game = new Game({
            players: [],
            room: room,
            ready: false,
            status: false
        });

        if (id !== -1) {
            // If room exists add player to that room
            game = this.games[id];
            game.addPlayer(username);

        } else {
            // If room doesnt exist create new one with given playere 
            game.addPlayer(username);
            this.games.push(game);
        }
        return game

    }

}

module.exports = { Games };