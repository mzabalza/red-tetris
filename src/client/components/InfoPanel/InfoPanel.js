import React from 'react';
import Display from './Display';
import './InfoPanel.css';

const InfoPanel = ({ turn, score, rows }) => {

    return (
        <div className='infoPanel'>
            <Display type='Turn' value={turn} />
            <Display type='Score' value={score} />
            <Display type='Rows' value={rows} />
        </div>
    )
};

export default InfoPanel;