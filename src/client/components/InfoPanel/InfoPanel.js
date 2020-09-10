import React from 'react';
import Display from './Display';
import './InfoPanel.css';
import ActionButtons from '../../components/ActionButtons/ActionButtons';


const InfoPanel = ({ turn, score, rows,game, socket }) => {

    return (
        <div className='infoPanel'>
            <Display type='TURN' value={turn} />
            <Display type='SCORE' value={score} />
            <Display type='ROWS' value={rows} />
        </div>
    )
};

export default InfoPanel;