import React from "react";
import "./register.scss";
import { Link } from "react-router-dom";

const Register = () => {
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
                        <input type="text" placeholder="Username" />
                        <input type="email" placeholder="Email" />
                        <input type="tel" placeholder="Phone No" />
                        <input type="password" placeholder="Password" />
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
