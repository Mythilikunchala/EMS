import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResponsiveAppBar from './ResponsiveAppBar';
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    async function handleSubmit() {
        // Clear any existing validation errors and login error
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        setLoginError(null);

        if (email.trim() === "" || password.trim() === "") {
            setLoginError("Username and password are required.");
            return; // Exit early to prevent further processing
        }

        // Clear any existing validation errors and login error
       
        else if (!emailPattern.test(email)) {
                        setLoginError("Enter a valid email address");
                        return; // Exit early to prevent further processing
                    }
        if (email && password) {
            const apiUrl = 'https://localhost:7113/api/Employee/Login'; // Use the correct URL
            try {
                const response = await axios.post(apiUrl, {
                    Name: email, // Map 'email' to 'Name' in your API
                    Password: password
                });
                const isAuthenticated = response.data;
                debugger;
                if (isAuthenticated) {
                    console.log("hi");
                    debugger;
                    // Authentication succeeded, navigate to the CRUD component
                    navigate('/CRUD');
                } else {
                    // Authentication failed, set the error message
                    setLoginError("Invalid credentials");
                }
            } catch (error) {
                debugger;
                // Handle any network errors or other exceptions
                console.error("Login error:", error);
                setLoginError("An error occurred during login.");
            }
        }
    }

    return (
        
        
        <div className="bg">
            <ResponsiveAppBar />
            
            <h1><font color="yellow" align="center">EMPLOYEE MANAGEMENT SYSTEM</font></h1>
            <div className="border w-25 mt-5 m-auto p-3">
                
                <h2 className="text-primary text-center">Login</h2>
                <div className="mt-3 text-right">
                    <label style={{ color: 'white' }}>Username:</label>
                    <input
                        type='email'
                        className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mt-3">
                    <label style={{ color: 'white' }}>Password:</label>
                    <input
                        type='password'
                        className='form-control'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mt-1">
                    {loginError && <div className="text-danger">{loginError}</div>}




                </div>
                <div className="mt-3">
                    <button className="btn btn-primary w-100" onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
