
class Player {
    constructor(player) {
        // Some of this properties are probably not needed
        this.id = player.id || '';
        this.name = player.name || '';
        this.score = 0;
        this.ready = false;
        this.gameOwner = false;
        this.turn = 1;
        this.rows = 0;
    };

    update(props) {

        this.score = props.score || this.score;
        this.ready = props.ready || this.ready;
        this.gameOwner = props.gameOwner || this.gameOwner;
        this.turn = props.turn || this.turn;
        this.rows = props.rows || this.rows;

    };
};

module.exports = { Player };