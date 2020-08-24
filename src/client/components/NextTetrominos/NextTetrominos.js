import React from 'react';
import { StyledPiece } from './StyledPiece';
import './NextTetrominos.css';

import Cell from '../Cell/Cell';





const NextTetrominos = ({ nextTetrominos }) => {


    return (

        <div className="tetrominosWrapper">
            {nextTetrominos && nextTetrominos.map((piece, x) => {
                return (
                    <StyledPiece key={x} width={piece.shape.length} height={piece.shape.length} size={4}>
                        {piece.shape.map(row => row.map((cell, x) => <Cell key={x} type={cell} color={'0, 0, 0'} />))}
                    </StyledPiece>
                )
            })}

        </div>

    )
}

export default NextTetrominos;