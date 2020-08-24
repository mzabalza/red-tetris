import React from 'react';
import Cell from '../Cell/Cell';
import { StyledStage } from './StyledStage';
import './Stage.css';

const Stage = ({ stage, size }) => (

    <StyledStage width={stage[0].length} height={stage.length} size={size} >
        {stage.map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
    </StyledStage>
);

export default Stage;