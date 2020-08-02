import React from 'react';

i
const Leaderboard = ({ game }) => {

    console.log(`Game: ${game}`);

    const rows = (

        game.players && game.players.map(player => (
            <tr>
                <td>#1</td>
                <td>mzabalza</td>
                <td>127</td>
            </tr>)
        ))

    return (
        <StyledLeaderboard>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>name</th>
                        <th>score</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </StyledLeaderboard>
    )
}

export default Leaderboard;