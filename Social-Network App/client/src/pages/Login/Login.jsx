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
                    <h1>Hey There !!</h1>
                    <p>
                    Welcome to our community! 🌟 Here, we’re all about connecting, sharing,
                    and making everyday life a bit brighter. Join us for tips, inspiration, and 
                    conversations that matter. Dive in, say hi, and let’s build something amazing 
                    together! 💬 #Welcome #StayConnected
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
