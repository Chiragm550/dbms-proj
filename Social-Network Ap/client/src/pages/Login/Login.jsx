import React, { useContext, useState } from 'react'
import './login.scss'
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
    const { currentUser, login } = useContext(AuthContext)
    const navigator = useNavigate()

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState(null)

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    console.log(inputs);
    
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await login(inputs)
            setError(null)
            navigator("/")
        }
        catch (err) {
            setError(err.response.data)
        }
    }
    
    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Hello World</h1>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere dicta, maiores officiis
                        repellat nulla deserunt quod? Provident, nisi similique. Blanditiis omnis porro eligendi at
                        vitae? Temporibus laboriosam laborum suscipit voluptas?
                    </p>
                    <span>Not yet registered ?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                        {error && error }
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login
