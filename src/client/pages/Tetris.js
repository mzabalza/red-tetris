import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const Tetris = ({ location, match }) => {
    const [users, setUsers] = useState([]);
    const [game, setGame] = useState({});


    const { room, username } = match.params;
    const ENDPOINT = 'localhost:5000';

    console.log(match);
    console.log(location.pathname);


    useEffect(() => {
        socket = io(ENDPOINT);

        socket.on('users', ({ users }) => {
            setUsers(users);
        });

        socket.emit('join', { username, room });
        console.log(location.search);


    }, [ENDPOINT]);

    return (
        <div>
            <h1>Tetris Page</h1>
            <h2>Room: {room} user: {username}</h2>

            {users && users.map((user, i) => (
                <div key={i} >{user}</div>
            ))}
        </div>
    )
}

export default Tetris;