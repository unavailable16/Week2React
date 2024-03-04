import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import AuthContext
import "./Login.css";

const Login = () => {
    const { login } = useAuth(); // Gunakan hook useAuth
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [loginData, setLogin] = useState({
        username: "",
        pass: "",
    });

    function handleChange(e) {
        let data = { ...loginData };
        data[e.target.name] = e.target.value;
        setLogin(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/User');
            const data = await res.json();
            const isValid = data.find(a => a.username === loginData.username && a.pass === loginData.pass);
            if (isValid) {
                login(loginData.username); // Setelah login berhasil, panggil fungsi login dengan menyertakan username
                navigate("/home");
            } else {
                setError("Username or password is incorrect");
            }
        } catch (error) {
            console.error("Error:", error);
            setError("Error occurred while logging in");
        }
    };

    return (
        <div className="container-login">
            <div className="center">
                <div className="bold-text">Login</div>
                <form onSubmit={handleSubmit}>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <div className="txt_field">
                        <input
                            value={loginData.username}
                            onChange={handleChange}
                            type="text"
                            name="username"
                            id="username"
                            required
                            onInvalid={(e) => e.target.setCustomValidity("Harap Masukan Username!")}
                            onInput={(e) => e.target.setCustomValidity("")}
                        />
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className="txt_field">
                        <input
                            value={loginData.pass}
                            onChange={handleChange}
                            type="password"
                            name="pass"
                            id="password"
                            required
                            onInvalid={(e) => e.target.setCustomValidity("Harap Masukan Password!")}
                            onInput={(e) => e.target.setCustomValidity("")}
                        />
                        <span></span>
                        <label>Password</label>
                    </div>
                    <span>
                        <button className="btnlogin" type="submit" name="submit">Login</button>
                    </span>
                </form>
                <div className="signup_link">
                    Don't Have an Account ? <NavLink to="/sign">Register</NavLink> Now
                </div>
                <h6 className="pass"><a href="https://www.youtube.com/c/AHDHAN16Bruh">© 2024 Ahdhan Setya Ananta XII RPL</a></h6>
            </div>
        </div>
    );
};

export default Login;