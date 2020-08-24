
const { Game } = require('./game.model');

class Games {

    constructor() {
        this.games = [];
    };

    findGame(room) {
        const id = this.games.findIndex(game => game.room == room);
        return this.games[id];

    };

    addGame(game) {
        this.games.push(game);

    };

    addPlayer(room, player) {
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
            game.addPlayer(player);

        } else {
            // If room doesnt exist create new one with given playere 
            game.addPlayer(player);
            this.games.push(game);
        }
        return game
    }
    removePlayer(id) {

        let newGame = undefined;
        this.games.map(game => {
            const index = game.players.findIndex(player => player.id == id);
            if (index > -1) {
                game.players.splice(index, 1);
                newGame = game;
            }
        })
        return newGame;
    }

}

module.exports = { Games };