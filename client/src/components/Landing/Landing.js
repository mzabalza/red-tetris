import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// TODO: Title

const Landing = () => {

    return (
        <Fragment>
            <h1 className="title">TETRIS</h1>
            <div className="container-landing">
                <Link className="link" to="/login">
                    <div className="nav-box nav-box--blue">
                        LOGIN
                    </div>
                </Link>
                <Link className="link" to="/register">
                    <div className="nav-box nav-box--red">
                        REGISTER
                    </div>
                </Link>
            </div>

        </Fragment>
    )
};

export default Landing;