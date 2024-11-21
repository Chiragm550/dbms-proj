import React, { useState } from "react";
import "./register.scss";
import { Link } from "react-router-dom";
import axios from "axios"

const Register = () => {

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        name: ""
    })

    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    // console.log(inputs)
    const [err, setErr] = useState(null)

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:8080/api/auth/register", inputs)
            setErr(null)
        }
        catch (err) {
            setErr(err.response.data)
        }
    }

    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>Hello World</h1>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere dicta, maiores officiis
                        repellat nulla deserunt quod? Provident, nisi similique. Blanditiis omnis porro eligendi at
                        vitae? Temporibus laboriosam laborum suscipit voluptas?
                    </p>
                    <span>Already have an account ?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form>
                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                        <input type="text" placeholder="Name" name="name" onChange={handleChange} />
                        {err && err}
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
