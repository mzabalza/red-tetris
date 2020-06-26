import React from 'react';
import Header from './Header';
import Rooms from '../Home/Rooms';



const Admin = () => {




    return (
        <div className="admin">
            <div className="sidebar-home">
                <div className="sidebar-title">TETRIS.IO</div>


            </div>

            <div className="main-home">
                <h1>Users</h1>
                <div className="table-container">
                    <Rooms modalIsOpen={false} />
                </div>
                <h1>Rooms</h1>
                <div className="table-container">
                    <Rooms modalIsOpen={false} />
                </div>




            </div>
        </div>
    )
}

export default Admin;