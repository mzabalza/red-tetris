import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


// REDUX STORE
import { Provider } from 'react-redux';
import store from './store/store';

////////////////////////////////////////////
// PAGES
import Landing from './pages/Landing/Landing';
import Tetris from './pages/Tetris/Tetris';
import Alerts from './components/Alerts/Alerts';

const App = () => {

    return (
        <Provider store={store}>
            <Alerts />
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/:room/:username' component={Tetris} />
                </Switch>
            </BrowserRouter>
        </Provider>
    )
};

export default App;

