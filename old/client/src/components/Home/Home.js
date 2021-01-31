import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


// COMPONENTS
import GameModal from '../GameModal';
import Rooms from './Rooms';
import Error from '../Error/Error';

// ACTIONS
import { logout } from '../../store/actions/auth';
import { setAlert } from '../../store/actions/alert';


const Home = ({ auth: { user }, logout, alerts, setAlert }) => {

    console.log(user);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState([]);
    const [roomFlag, setRoomFlag] = useState(true);

    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    const onError = () => {
        // setErrors(prev => ([...prev, 'Error: New error fetching data from rooms']));
        setAlert('Error: Testing error with redux', 'Error', 2000);

    };


    return (
        <div>
            <div>
                {alerts.length ? <Error className="error" errors={alerts} /> : null}
            </div>
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

                            <Link to={{ pathname: "/admin" }} className="item flex-col-1">
                                <i className="fas fa-user"></i>
                                <div></div>
                            </Link>
                            <div onClick={onError} className="item flex-col-1">
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
        </div>

    )
};

const mapStateToProps = state => ({
    auth: state.auth,
    alerts: state.alert
})

export default connect(mapStateToProps, { logout, setAlert })(Home);