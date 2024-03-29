import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const value = { email: username, password: password };
        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ "username": username, "password": password }),
            });
            const data = await response.json();
            if (!data.access_token) {
                alert("Email or password wrong");
            } else {
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                navigate("/")
            }
        } catch (error) {
            console.log(error);
        }

    };
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100"
            style={{ maxWidth: "700px" }}>
            <form className="p-4 border shadow w-100">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input type="text"
                        id="username"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
};
export default Login;