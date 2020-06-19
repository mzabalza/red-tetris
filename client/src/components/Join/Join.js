import React, { useState } from 'react';
import { Link } from 'react-router-dom';


// TODO: className login-title modify to css course global titles

// TODO: CHECKINGS
// USERNAME NOT EXISTING
// BOTH INPUTS FILLED

// TODO: REGISTER USER AND ROOM SERVERSIDE

// CHANGE LINK TO OTHER METHOD. ACTION??

const Join = () => {

    const [formData, setFormData] = useState({
        name: null,
        room: null,
    });

    console.log(!formData.name || !formData.room);


    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = e => {
        e.preventDefault();

    };

    const onClick = e => {
        if (!formData.name || !formData.room) {
            return e.preventDefault()
        } else {

            return null
        }
    };

    return (
        <div className="container">
            <div className="login-title">TETRIS</div>
            <form className="form u-margin-top-medium" onSubmit={e => onSubmit(e)}>
                <div>
                    <input className="input" type="text" name="name" placeholder="NAME" autoComplete="off"
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="my-t1">
                    <input className="input" type="text" name="room" placeholder="ROOM" autoComplete="off"
                        onChange={e => onChange(e)}
                    />
                </div>
            </form>
            <div className="u-center-text u-margin-top-medium">
                <Link onClick={e => onClick(e)} to={{ pathname: "/tetris", state: { formData } }}>
                    <input className="btn btn--dinamic" type="submit" value="Join Game" />
                </Link>
            </div>

        </div>
    )
}

export default Join;