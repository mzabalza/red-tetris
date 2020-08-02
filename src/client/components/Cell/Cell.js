import React from 'react';
import { StyledCell } from './StyledCell';
import { TETROMINOS } from '../../utils/tetrominos';

const Cell = ({ type }) => {
    console.log(type);
    return (
        <StyledCell type={type} color={TETROMINOS[type].color} />
    )
}

export default React.memo(Cell);
// React.memo optimizes the app so that the cell only rerenders when its changing