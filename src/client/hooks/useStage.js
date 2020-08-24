import { useState, useEffect } from 'react';
import { createStage } from '../utils/gameHelpers';

export const useStage = (player, resetPlayer, setTurn, nextTetrominos) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = stage => {

            // ack: accumulator
            const newStage = stage.reduce((ack, row) => {
                // .findIndex:  returns the positioon of the matching function provided
                //              returns -1 if not match founded
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    if (row.findIndex(cell => cell[0] === 'G') != -1) {
                        ack.push(row);
                        return ack;
                    }
                    console.log('Remove ROW!!');
                    setRowsCleared(prev => prev + 1);
                    // .unshift allows us to add a value at the beginning of the array
                    ack.unshift(new Array(stage[0].length).fill([0, 'clear']));
                    // ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));

                    // We didnt push the current row to the ack so that means we delete it.
                    return ack;
                }
                // If we dont find a row that should be cleared we just push the row into the accumulator array
                ack.push(row);
                return ack;


            }, []) // ???
            return newStage

        }


        const updateStage = prevStage => {
            // First flush the stage
            const newStage = prevStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );

            // Then draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            });
            // Then check if we collided
            if (player.collided) {
                setTurn(prev => prev + 1);
                resetPlayer(nextTetrominos[0]);


                return sweepRows(newStage);

            }

            return newStage;
        };

        setStage(prev => updateStage(prev));
    }, [player, resetPlayer]);

    return [stage, setStage, rowsCleared];
};