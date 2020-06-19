import React, { useEffect } from 'react';
import Tetris from './components/Tetris';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// COMPONENTS
import Join from './components/Join/Join';
import Landing from './components/Landing/Landing';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home/Home';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';

// ACTIONS
import { loadUser } from './actions/auth';

// REDUX STORE
import { Provider } from 'react-redux';
// STYLES
import './sass/App.scss'

import store from './store';



// First time
if (localStorage.token) {
  setAuthToken(localStorage.token)
}


const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/join" component={Join} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/tetris" component={Tetris} />
          <PrivateRoute path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;