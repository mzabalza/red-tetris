import { useState, useEffect } from 'react';

export const useNextTetrominos = (game, turn, rows, socket) => {
    const [nextTetrominos, setNextTetrominos] = useState([]);

    useEffect(() => {
        console.log(`New turn ${turn}, rows: ${rows}`);
        if (socket) {
            socket.emit('newTurn', { room: game.room, turn, rows });
        }

    }, [turn])



    return [nextTetrominos, setNextTetrominos];

}

