import React, { useState } from 'react';
import { register } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';


const Register = ({ register, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: null,
        password: null,
        password2: null,
    });

    const { name, password, password2 } = formData;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async e => {
        e.preventDefault();

        console.log('Submit pressed');
        if (password !== password2) {
            console.log('Passwords do not match');

        }
        register({ name, password });

    }

    // Redirect if Logged in
    if (isAuthenticated) {
        return <Redirect to='/login' />
    }

    return (
        <div className="container">
            <div className="login-title">REGISTER</div>
            <form className="flex-col-1 form u-margin-top-medium" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input className="input" type="text" name="name" placeholder="NAME" autoComplete="off"
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="my-t1">
                    <input className="input" type="password" name="password" placeholder="PASSWORD" autoComplete="off"
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="my-t1">
                    <input className="input" type="password" name="password2" placeholder="REPEAT PASSWORD" autoComplete="off"
                        onChange={e => onChange(e)}
                    />
                </div>

                <div className="u-center-text u-margin-top-medium">
                    <input className="btn btn--dinamic" type="submit" value="submit" />
                </div>
            </form>
        </div>
    )
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

// connect(state, actions)
export default connect(mapStateToProps, { register })(Register);