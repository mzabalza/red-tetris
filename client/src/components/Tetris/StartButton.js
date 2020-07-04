import React from 'react';
import { StyledStartButton } from '../styles/StyledStartButton';

const StartButton = ({ disabled, callback, text }) => {
    console.log(`Start Button disabled: ${disabled}`)

    return (
        <StyledStartButton disabled={disabled} onClick={callback}>{text}</StyledStartButton>
    )
}

export default StartButton;