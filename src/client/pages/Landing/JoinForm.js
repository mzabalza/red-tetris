import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const JoinForm = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div>
            <input type="text" name="username" placeholder="username"
                onChange={(e) => setName(e.target.value)}
            />
            <input type="text" name="room" placeholder="room"
                onChange={e => setRoom(e.target.value)}
            />
            <Link onClick={(e) => (!name) ? e.preventDefault() : null} to={`/${room}/${name}`}>
                <button>Join</button>
            </Link>
        </div>
    )

};

export default JoinForm;