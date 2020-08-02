import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { createStage } from '../../utils/gameHelpers';


// COMPONENTS
import Stage from '../../components/Stage/Stage';
import Leaderboard from '../../components/Leaderboard/Leaderboard';

let socket;

const Tetris = ({ location, match }) => {
    const [players, setPlayers] = useState([]);
    const [game, setGame] = useState({});
    const [stage, setStage] = useState(createStage());


    const { room, username } = match.params;
    const ENDPOINT = 'localhost:5000';

    console.log(match);
    console.log(location.pathname);


    useEffect(() => {
        socket = io(ENDPOINT);

        socket.on('game', ({ game }) => {
            setGame(game);
            setPlayers(game.players);
        });
        console.log('mike');
        socket.emit('join', { username, room });
        console.log(location.search);

        console.log(stage);
    }, [ENDPOINT]);

    return (
        <div>
            <h1>Tetris Page</h1>
            <h2>Room: {room} user: {username}</h2>
            <Leaderboard game={game} />
            <Stage stage={stage} size={1} />
            {players && players.map((player, i) => (
                <div key={i} >{player}</div>
            ))}
        </div>
    )
}

export default Tetris;