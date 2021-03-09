import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import { AppContext } from './AppContext';
import Login from './Login/Login';
import Console from './Console/Console';

const App = () => {

    // const companySession = localStorage.getItem('company');
    // const [company, setCompany] = useState(companySession);
    const [isLoggedIn, setIsLoggedIn] = useState(!!JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        const interval = setInterval(() => {
            const userStorage = JSON.parse(localStorage.getItem('user'));
            const now = Date.now();
            console.log(`app ${isLoggedIn}`);
            if (isLoggedIn) {
                if (!userStorage || now > userStorage.expireAt) {
                    setIsLoggedIn(false);
                    localStorage.clear();
                }
            }
        }, 10*60*1000); // 10 min
        return () => clearInterval(interval);
    }, []);

    const routes = () => {
        if (!isLoggedIn) {
            return (
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Redirect to={{ pathname: '/login'}} />
                </Switch>
            )}
        else {return (
            <Switch>
                <Route path="/" component={Console} />
                <Redirect to={{ pathname: '/'}} />
            </Switch>
        )}

    };

    // console.log(`app rendered`);

    return (
            <div className="App">
                <BrowserRouter>
                    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
                    {routes()}
                    </AppContext.Provider>
                </BrowserRouter>
                <div className="footer">
                    Prody (C) All rights reserved
                </div>
            </div>
    );
};

export default App;