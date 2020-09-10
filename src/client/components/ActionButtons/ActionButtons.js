import React, { useState } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import { randomTetromino } from '../../utils/tetrominos';
import { setAlert } from '../../store/actions/alert';


import './ActionButtons.css';

const ActionsButtons = ({ game, socket }) => {

    const start = (e) => {
        e.preventDefault();
        socket.emit('startGame', { room: game.room });

    };

    return (
        <div className='button-container'>
            <div className="actionButton" onClick={e => start(e)}>
                <div>START</div>
            </div>
        </div>
    )

}


export default connect(null, { setAlert })(ActionsButtons)