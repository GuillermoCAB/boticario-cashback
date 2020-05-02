import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/cadastrar' exact component={SignUp} />
                <Route path='/home' exact component={Home} />
            </Switch>
        </BrowserRouter>
    )
};

export default Routes;