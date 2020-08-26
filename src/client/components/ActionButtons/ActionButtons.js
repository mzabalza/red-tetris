import React, { useState } from 'react';
import { connect } from 'react-redux';

import { randomTetromino } from '../../utils/tetrominos';
import { setAlert } from '../../store/actions/alert';




const ActionsButtons = ({ turn, setTurn, game, startGame, socket, pause, setAlert, setIsOpen }) => {

    const nextTetrominos = () => {
        setTurn(turn + 1);
    };

    const start = (e) => {
        e.preventDefault();
        socket.emit('startGame', { room: game.room });

    };

    return (
        <div>
            <button onClick={e => start(e)}>Start game</button>
            <button onClick={() => setIsOpen(true)}>Open Modal</button>

            <button onClick={e => pause()}>Pause</button>
            <button onClick={e => nextTetrominos()}>Next Tetrominos</button>
        </div>
    )

}


export default connect(null, { setAlert })(ActionsButtons)