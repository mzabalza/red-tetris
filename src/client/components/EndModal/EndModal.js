import React from 'react';
import Modal from 'react-modal';
import './EndModal.css';

const EndModal = ({ game, modalIsOpen, closeModal }) => {


    const rows = (
        game.players && game.players.map((player, i) => (
            <tr key={i} >
                <td>#{i + 1}</td>
                <td>{player.name}</td>
                <td>{player.turn}</td>
                <td>127</td>
            </tr>)
        ))


    return (
        <div>
            <Modal className="endModal"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Selected Option"
                ariaHideApp={false}
            >
                <h1>YOU LOST!!</h1>

                <div>GAME STANDING</div>
                <table>
                    <tbody>{rows}</tbody>
                </table>


                <button onClick={closeModal}>
                    x
                </button>
            </Modal>
        </div>
    )

};

export default EndModal;