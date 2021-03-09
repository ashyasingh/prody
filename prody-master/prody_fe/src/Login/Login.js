import React, { useContext, useState } from 'react';

import './Login.css';
import axios from "axios";
import {AppContext} from "../AppContext";
import {CONSTANTS} from '../utils/constants';


const Login = ( props ) => {

    // const { setCompany } = useContext(LoginContext);
    const { setIsLoggedIn } = useContext(AppContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [missingData, setMissingData] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);

    const changeNameHandler = (event) => {
        setUsername(event.target.value);
        setMissingData(false);
        setLoginFailed(false);
    };

    const changePwdHandler = (event) => {
        setPassword(event.target.value);
        setMissingData(false);
        setLoginFailed(false);
    };

    const loginHandler = () => {
        // setCompany(username);
        // localStorage.setItem('company', username);
        // props.history.push('/console');

        if(username === '' || password === '') {
            return setMissingData(true);
        } else {
            const authData = {username: username, password: password};

            axios.post(`${CONSTANTS.URL_PREFIX}://prody.me/api/console_login`, authData)
                .then((res) => {
                    if (res.data.accessToken) {
                        localStorage.setItem("user", JSON.stringify(res.data));
                        // console.log(`login - redirect`);
                        setIsLoggedIn(true);
                        props.history.push('/')
                    }

                    return res.data;
                })
                .catch((err) => {
                    setLoginFailed(true);
                    console.log(err)})
        }
    };

    // console.log(`login rendered`);

    return (
        <div className="LoginContainer">
            <img className="login-logo" src={window.location.origin + '/logo.png'} alt={"Prody"} height={"42"} width={"116"}/>
                <div className="LoginSubContainer">
                    <h2>Login</h2>
                    <input className="login-input"
                           type="text"
                           placeholder="Username"
                           name="name"
                           onChange={changeNameHandler}
                           value={username}
                           required/>
                    <input className="login-input"
                           type="password"
                           placeholder="Password"
                           name="psw"
                           onChange={changePwdHandler}
                           value={password} required/>
                    <button className="login-button"
                            onClick={loginHandler}>
                        Login</button>
                    {loginFailed && <div className="loginFailed">Login failed<br/>Username or password are incorrect</div>}
                    {missingData && <div className='loginMissingData'>missing username or password</div>}
                </div>
        </div>
    );
};

export default Login;