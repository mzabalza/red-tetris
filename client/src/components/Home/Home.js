import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';

// COMPONENTS
import GameModal from '../GameModal';
import Rooms from './Rooms';

// ACTIONS
import { logout } from '../../actions/auth';


let socket;



const Home = ({ auth: { user }, logout }) => {

    //////////////////////////////////////////////////////
    // MODAL HANDLERS
    const [modalIsOpen, setIsOpen] = useState(false);

    // const [room, setRooms] = useState('');

    const [roomFlag, setRoomFlag] = useState(true);


    const ENDPOINT = 'localhost:5003';

    // useEffect(() => {
    //     socket = io(ENDPOINT);

    //     socket.on('rooms', ({ rooms }) => {
    //         console.log('Rooms: ');
    //         console.log(rooms);
    //         setRooms(rooms);
    //     });

    // }, []);


    const homeClick = e => {
        console.log('clicking home click');

    }




    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
    }
    //////////////////////////////////////////////////////  


    return (
        <div className="home">
            <div className="sidebar-home">
                <div className="sidebar-title" onClick={logout}>TETRIS.IO</div>

                <div className="ul">
                    <div className="item">PROFILE</div>
                    <div onClick={openModal} className="item">PLAY</div>
                    <div className="item">FRIENDS</div>
                    <div className="item">SETTINGS</div>
                </div>
            </div>
            <div className="main-home">
                <div className="flex-row-1" >
                    <div className="dashboard-header">
                        <div onClick={openModal} className="item flex-col-1">
                            <i className="fas fa-gamepad fa-2x"></i>
                            <div></div>
                        </div>
                        <div className="item flex-col-1">
                            <i className="fas fa-user"></i>
                            <div></div>
                        </div>
                        <div className="item flex-col-1">
                            <i className="fas fa-trophy fa-2x"></i>
                            <div></div>
                        </div>

                    </div>
                    <div className="item flex-col-1">
                        <i className="fas fa-user fa-3x"></i>
                        <div>{user && user.name}</div>
                    </div>
                </div>

                <div className="table-container">
                    <Rooms modalIsOpen={modalIsOpen} />
                </div>


                <div>
                    <GameModal
                        modalIsOpen={modalIsOpen}
                        closeModal={closeModal}
                        masterUser={user && user.name}
                        setRoomFlag={setRoomFlag}
                    />
                </div>

            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Home);