import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import axios from 'axios';


Modal.setAppElement('#root');

const GameModal = ({ modalIsOpen, closeModal, masterUser }) => {

    const ENDPOINT = 'localhost:5003';

    const [formData, setFormData] = useState({
        name: null, // TODO: no name here, take it from redux or from token
        roomName: null,
        nbPlayers: 0,
        level: 0
    });

    const { name, roomName, nbPlayers, level } = formData;

    console.log(`Master User ${masterUser}`);


    useEffect(() => {

        setFormData({
            ...formData,
            masterUser
        })
    }, []);


    const onSubmit = e => {
        // e.preventDefault();
        // socket.emit('createRoom', { masterUser, level, nbPlayers, roomName }, error => {
        //     if (error) {
        //         alert(error);
        //     }
        // });



    };

    const onClick = e => {
        if (!formData.nbPlayers || !formData.roomName || !formData.level) {
            return e.preventDefault()

        } else {
            return null
        }
    };

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const createGame = async (e) => {
        console.log('clicked create game button');
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = { masterUser, roomName, nbPlayers, level };

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/room`, body, config);
        closeModal();
    }


    return (
        <div>
            <Modal className="modal"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <div className="flex-row-1-sb">
                    <h2>NEW GAME</h2>
                    <div className='btn-conf btn-conf--grey' onClick={closeModal}>X</div>
                </div>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="sidebar p2">
                        <header className="header header--sidebar">
                            <div className="user-nav__box">
                                <span className="user-nav__notification">LEVEL</span>
                            </div>
                            <div>
                                {level}
                            </div>
                            <div>
                                <div className='btn-conf btn-conf--green' onClick={() => setFormData({ ...formData, level: 1 })}>1</div>
                                <div className='btn-conf btn-conf--green' onClick={() => setFormData({ ...formData, level: 2 })}>2</div>
                                <div className='btn-conf btn-conf--green' onClick={() => setFormData({ ...formData, level: 3 })}>3</div>
                                <div className='btn-conf btn-conf--green' onClick={() => setFormData({ ...formData, level: 4 })}>4</div>

                            </div>
                        </header>
                        <header className="header header--sidebar">
                            <div className="user-nav__box">
                                <span className="user-nav__notification">NUMBER OF PLAYERS</span>
                            </div>
                            <div>
                                {nbPlayers}
                            </div>
                            <div>
                                <div className='btn-conf btn-conf--green' onClick={() => setFormData({ ...formData, nbPlayers: 1 })}>1</div>
                                <div className='btn-conf btn-conf--green' onClick={() => setFormData({ ...formData, nbPlayers: 2 })}>2</div>
                                <div className='btn-conf btn-conf--green' onClick={() => setFormData({ ...formData, nbPlayers: 3 })}>3</div>
                                <div className='btn-conf btn-conf--green' onClick={() => setFormData({ ...formData, nbPlayers: 4 })}>4</div>
                            </div>
                        </header>
                        <header className="header header--sidebar">
                            <div className="user-nav__box">
                                <span className="user-nav__notification">ROOM</span>
                            </div>
                            <div>
                                {roomName}
                            </div>
                            <div>
                                <div className="my-t1">
                                    <input className="input" type="text" name="roomName" placeholder="ROOM" autoComplete="off"
                                        onChange={e => onChange(e)}
                                    />
                                </div>

                            </div>
                        </header>
                        <div className="u-center-text u-margin-top-medium">
                            <div onClick={e => createGame(e)}>
                                <input className="btn btn--blue" type="button" value="Create Game" />
                            </div>
                        </div>
                        <div className="u-center-text u-margin-top-medium">
                            <Link onClick={e => onClick(e)} to={{ pathname: "/tetris", state: { formData } }}>
                                <input className="btn btn--dinamic" type="submit" value="Join Game" />
                            </Link>
                        </div>
                    </div>
                </form>



            </Modal>
        </div>
    )
};


export default GameModal;