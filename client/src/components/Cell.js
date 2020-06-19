import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';

const Cell = ({ type }) => (
    <StyledCell type={type} color={TETROMINOS[type].color} />
)

export default React.memo(Cell);
// React.memo optimizes the app so that the cell only rerenders when its changing