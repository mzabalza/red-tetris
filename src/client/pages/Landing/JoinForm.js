import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './JoinForm.css';

const JoinForm = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className='form'>
            <input type="text" name="username" placeholder="username" autoComplete="off"
                onChange={(e) => setName(e.target.value)}
            />
            <input type="text" name="room" placeholder="room" autoComplete="off"
                onChange={e => setRoom(e.target.value)}
            />
            <Link onClick={(e) => (!name) ? e.preventDefault() : null} to={`/${room}/${name}`}>
                <button className='button-join'>Join</button>
            </Link>
        </div>
    )

};

export default JoinForm;