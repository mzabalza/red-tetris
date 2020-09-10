import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import './EndModal.css';
import { useStage } from '../../hooks/useStage';

const EndModal = ({ game, modalIsOpen, closeModal }) => {

    const [message, setMessage] = useState('You Lost');
    const [color, setColor] = useState('blue');


    useEffect(() => {
        console.log(game);
        console.log(game.players.length);
        if (game.players.length == 1) {
            setColor('green');
            setMessage('You Won!!');
        }
        else {
            setColor('blue');
            setMessage('You Lost!!');
        }
    }, [modalIsOpen, game])

    // useEffect


    const rows = (
        game.players && game.players.map((player, i) => (
            <tr key={i} >
                <td>#{i + 1}</td>
                <td>{player.name}</td>
                <td>{player.turn}</td>
                <td>{player.rows}</td>
            </tr>)
        ))


    return (
        <div>
            <Modal className={"endModal endModal-" + color}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Selected Option"
                ariaHideApp={false}
            >
                <h1>{message}</h1>

                <div>LEADERBOARD</div>

                <table className="modal-table">
                    <tbody>{rows}</tbody>
                </table>

                <Link to={`/`}>
                    <button className='button-join'>BACK TO MENU</button>
                </Link>
            </Modal>
        </div>
    )

};

export default EndModal;