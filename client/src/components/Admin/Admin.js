import React from 'react';
import { Link } from 'react-router-dom';

import RoomsCrud from './tables/RoomsCrud';
import UsersCrud from './tables/UsersCrud';



const Admin = () => {

    return (
        <div className="home">
            <div className="sidebar-home">
                <div className="sidebar-title">TETRIS.IO</div>
                <div className="ul">
                    <Link className="link" to={'/home'} className="item">HOME</Link>
                </div>
            </div>

            <div className="main-home p-3">
                <div className="table-container">
                    <h1 className="my-b3">Users</h1>
                    <UsersCrud />
                </div>
                <div className="table-container">
                    <h1 className="my-b3">Rooms</h1>
                    <RoomsCrud />
                </div>
            </div>
        </div>
    )
}

export default Admin;