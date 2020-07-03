import React from 'react';
import { StyledStartButton } from '../styles/StyledStartButton';

const StartButton = ({ disabled, callback, text }) => {
    console.log(`Disabled: ${disabled}`)

    return (
        <StyledStartButton readyToPlay={disabled} onClick={callback}>{text}</StyledStartButton>
    )
}

export default StartButton;