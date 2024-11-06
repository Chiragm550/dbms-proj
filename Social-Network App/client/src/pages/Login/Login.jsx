import React, { useContext } from 'react'
import './login.scss'
import {Link, useNavigate} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
    const { currentUser, login } = useContext(AuthContext)

    const navigator = useNavigate()
    
    const handleLogin = () => {
        login()
        navigator("/")
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
                    <Link to='/register'>
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login
