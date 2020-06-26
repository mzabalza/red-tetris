import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



const Header = ({ auth, logout }) => {




    return (
        <div>

            <div className="sidebar-home">
                <div className="sidebar-title" onClick={logout}>TETRIS.IO</div>

                <div className="ul">
                    <div className="item">
                        <Link to={{ pathname: "/home"}}>
                            <i className="fas fa-sign-out-alt" />
                            <span>HOME</span>
                        </Link>
                        
                    </div>

                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps)(Header);