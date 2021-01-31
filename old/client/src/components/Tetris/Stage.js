import React from 'react';
import Cell from './Cell';
import { StyledStage } from '../styles/StyledStage';

const Stage = ({ stage, size }) => (
    <StyledStage width={stage[0].length} height={stage.length} size={size} >
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StyledStage>
);

export default Stage;