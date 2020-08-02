import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import JoinForm from './JoinForm';

const Landing = () => {

    return (
        <div>
            <h1>TETRIS.IO</h1>
            <JoinForm />
        </div>
    )
};

export default Landing;