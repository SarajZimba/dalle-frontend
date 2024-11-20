import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../scss/login.scss";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState({});
    const [errorValue, setErrorValue] = useState(false);
    let navigate = useNavigate();
    let url = process.env.REACT_APP_BASE_URL;

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post(`${url}/login`, {
            username: username,
            password: password
        })
            .then((res) => {
                setToken(res.data.token)
            })
            .catch((error) => {
                console.log(error)
                setError(error.response.data)
                setErrorValue(true)
            })
    }
    const handleUsername = (event) => {
        setUsername(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token)
            navigate("/bill")
        }
    }, [token])
    return (
        <div className='bg-login'>
            <div className='bg-form-img'>
            </div>
            <form>
            <div className='img-logo'>
                <img src='./logo.jpg' alt='logo' className="logo" />
            </div>
                {/* <h5>Login Here</h5> */}

                <label>Username</label>
                <input type="text" placeholder="Email or Phone" id="username" onChange={handleUsername} className="username" />

                <label>Password</label>
                <input type="password" placeholder="Password" id="password" onChange={handlePassword} className="password" />

                <button className='btn-login' onClick={handleLogin}>Log In</button>
                {errorValue ? <p className='error'>{error.error}</p> : ""}
           
            </form>
        </div>
    )
}

export default Login