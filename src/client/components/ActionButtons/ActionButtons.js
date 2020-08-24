import React, { useState } from 'react';

import { randomTetromino } from '../../utils/tetrominos';



const ActionsButtons = ({ turn, setTurn, game, startGame, setNextPiece, socket, pause }) => {


    const getNextPiece = e => {
        e.preventDefault();
        setNextPiece(randomTetromino());
    };

    const nextTetrominos = () => {
        console.log(turn);
        // socket.emit('newTurn', { room: game.room, turn });
        setTurn(turn + 1);
    };

    const start = (e) => {
        e.preventDefault();
        socket.emit('startGame', { room: game.room });
        // startGame();

    };


    return (
        <div>
            <button onClick={e => start(e)}>Start game</button>
            <button onClick={e => getNextPiece(e)}>Next Piece</button>
            <button onClick={e => pause()}>Pause</button>
            <button onClick={e => nextTetrominos()}>3 Pieces</button>
        </div>
    )

}

export default ActionsButtons