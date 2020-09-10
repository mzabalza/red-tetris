import React from 'react';
import { StyledLeaderboard, StyledRow } from './StyledLeaderboard';

import './leaderboard.css';

const Leaderboard = ({ game }) => {

    const colors = [
        '48, 211, 56',
        '227, 78, 78',
        '80, 227, 230',
        '223, 173, 36',
        '36, 95, 223',
    ];

    const rows = (
        game.players && game.players.map((player, i) => (
            <StyledRow color={colors[i]} key={i} >
                <td>#{i + 1}</td>
                <td>{player.name}</td>
                <td>{player.turn}</td>
                <td>{player.rows}</td>
            </StyledRow >)
        ))

    return (
        <StyledLeaderboard className="leaderboard">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>name</th>
                        <th>turn</th>
                        <th>score</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </StyledLeaderboard >

    )
}

export default Leaderboard;