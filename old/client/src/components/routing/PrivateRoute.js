import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Component to include in other componets. Takes other components as props
// If user is not authenticated and not loading redirect to /login and if false the component will load
const PrivateRoute = ({ component: Component, auth: { isAuthenticated }, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !isAuthenticated ? (
                <Redirect to='/login' />
            ) : (
                    <Component {...props} />
                )
        }
    />
);

PrivateRoute.propTypes = {

};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
