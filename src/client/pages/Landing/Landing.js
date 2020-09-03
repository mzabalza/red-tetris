import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import JoinForm from './JoinForm';
import './Landing.css'

const Landing = () => {

    return (
        <div>
            <div className='container'>
                <p className='title'>
                    <span className='text-tetris'>tetris</span>
                    <span className='text-io'>.io</span>

                </p>
                <JoinForm />
            </div>
        </div>
    )
};

export default Landing;