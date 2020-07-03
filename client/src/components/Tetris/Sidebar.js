import React, { useState, useEffect } from 'react';

const Sidebar = ({ setDropTime, setLevel, setScore, socket, roomData }) => {

    const [users, setUsers] = useState([]);


    const level = (nb) => {
        console.log('set Level in sidebar');
        setLevel(prev => (prev === 0 && nb < 0) || (prev == 9 && nb > 0) ? prev : prev + nb);
    };

    const dropTime = (nb) => {
        setDropTime(prev => prev === 500 && nb < 0 ? prev : prev + nb);
    };

    return (
        <div className="sidebar">
            <header className="header header--sidebar">
                <div className="user-nav__box">
                    <span className="user-nav__notification">LEVEL</span>
                </div>
                <div>
                    <div className='btn-conf btn-conf--green' onClick={() => level(1)}>
                        <i className="fas fa-arrow-up"></i>
                    </div>
                    <div className='btn-conf btn-conf--red' onClick={() => level(-1)}>
                        <i className="fas fa-arrow-down"></i>
                    </div>
                </div>
            </header>
            <header className="header header--sidebar">
                <div className="user-nav__box">
                    <span className="user-nav__notification">DROP TIME</span>
                </div>
                <div>
                    <div className='btn-conf btn-conf--green' onClick={() => dropTime(-100)}>
                        <i className="fas fa-arrow-up"></i>
                    </div>
                    <div className='btn-conf btn-conf--red' onClick={() => dropTime(100)}>
                        <i className="fas fa-arrow-down"></i>
                    </div>
                </div>
            </header>
            <header className="header header--sidebar">
                <div className="user-nav__box">
                    <span className="user-nav__notification">SCORE</span>
                </div>
                <div>
                    <div className='btn-conf btn-conf--green' onClick={() => setScore(prev => prev + 100)}>
                        <i className="fas fa-arrow-up"></i>
                    </div>
                    <div className='btn-conf btn-conf--red' onClick={() => setScore(prev => prev - 100)}>
                        <i className="fas fa-arrow-down"></i>
                    </div>
                </div>
            </header>


            <div className="my-t3 my-b3 p-2">
                <div className="user-item">
                    <div>USERNAME</div>
                    <div className="flex-row-1">
                        <div className="mgn-l-1">SCORE</div>
                        <div className="mgn-l-1">LEVEL</div>
                    </div>
                </div>
                {roomData ?
                    roomData.users.map((user, x) => (
                        <div key={x}>
                            <div className="user-item">
                                <div>{x + 1}. {user.userName}</div>
                                <div className="flex-row-1">
                                    <div className="pdng-w-2">{user.score}</div>
                                    <div className="pdng-w-2">{user.level}</div>
                                </div>
                            </div>
                        </div>

                    ))
                    : null
                }
            </div>
        </div>
    )
}

export default Sidebar;