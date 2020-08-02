
class Player {
    constructor(player) {
        // Some of this properties are probably not needed
        this.name = player.name || '';
        this.score = 0;
        this.ready = false;
        this.gameOwner = false;
    };

    update(props) {

        this.players = props.players || this.players;
        this.room = props.room || this.room;
        this.ready = props.ready || this.ready;
        this.status = props.status || this.status;
    };
};

module.exports = { Player };