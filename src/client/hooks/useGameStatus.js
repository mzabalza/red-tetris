import { useState, useEffect, useCallback } from 'react';

// import io from "socket.io-client";


export const useGameStatus = (rowsCleared, turn, game, socket) => {

    const ENDPOINT = 'http://localhost:5000';

    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);

    const linePoints = [40, 100, 300, 1200];

    // useCallback: otherwise this will go into an infinity Loop. CHECK IT !!!!


    const calcScore = useCallback(() => {
        if (rowsCleared > 0) {
            setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
            setRows(prev => prev + rowsCleared);

        }

    }, [level, linePoints, rowsCleared]) // ??
    // If we dont add the Callback it will be changed in each rerender and that will create the inifinity loop 


    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score])


    useEffect(() => {
        console.log(`New turn ${turn}, rows: ${rows}`);
        if (socket) {
            socket.emit('newTurn', { room: game.room, turn, rows });
        }

    }, [turn, rows]);

    return [score, setScore, rows, setRows, level, setLevel];
}