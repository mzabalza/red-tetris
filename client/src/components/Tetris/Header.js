import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';


// Actions
import { logout } from '../../store/actions/auth';
import axios from 'axios';



const Header = ({ auth, room, logout }) => {

    // [room, setRoom] = useState(null);
    const [userName, setUserName] = useState('');

    console.log('Room: ');
    console.log(room);





    const history = useHistory();

    const onClick = async (e) => {

        const data = { userName: auth.user.name };

        try {
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/room/${room}`, { data });
            console.log(res);
        } catch (error) {
            console.log(`Error: ${error}`);
        }

        // logout();
        history.push('/home');
    }

    return (
        <div>
            <header className="header">

                <nav className="user-nav">
                    <div className="user-nav__box">
                        {auth.user && <span className="user-nav__notification">User: {auth.user.name}</span>}
                    </div>
                    <div className="user-nav__box">
                        {room && <span className="user-nav__notification">ROOM: {room}</span>}
                    </div>

                    <div className="user-nav__box">
                    </div>
                </nav>
                <div className="user-nav">
                    <div className="link" onClick={e => onClick(e)}>
                        <i className="fas fa-sign-out-alt" />
                        <span>HOME</span>
                    </div>
                </div>

            </header>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, { logout })(Header);