import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

////////////////////////////////////////////
// PAGES
import Landing from './pages/Landing';
import Tetris from './pages/Tetris';

const App = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/:room/:username' component={Tetris} />
            </Switch>
        </BrowserRouter>
    )
};

export default App;