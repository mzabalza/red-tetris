import React, { useState } from 'react';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });

    const { name, password } = formData;

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async e => {
        console.log('button pressed');
        e.preventDefault();
        login({ name, password });
    }

    // Redirect if Logged in
    if (isAuthenticated) {
        return <Redirect to='/home' />
    }

    return (
        <div className="container">
            <div className="login-title">LOGIN</div>
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
                <div className="u-center-text u-margin-top-medium">
                    <input className="btn btn--dinamic" type="submit" value="SIGN IN" />
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);