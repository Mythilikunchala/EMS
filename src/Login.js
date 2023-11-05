import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar'; // Adjust the path to match your project structure

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(null);

    async function handleSubmit() {
        // Clear any existing validation errors and login error
        setLoginError(null);
    
        if (email.trim() === '' || password.trim() === '') {
            setLoginError('Username and password are required.');
            return;
        }
    
        try {
            // Send the user's credentials to the server's Authentication API
            const response = await fetch('http://192.168.29.60/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Username: email, // Change to 'Username'
                    Password: password,
                }),
            });
    
            if (response.status === 200) {
                // Server responds with a JWT token
                const data = await response.json();
                const token = data.token;
    
                // Store the token securely in localStorage
                localStorage.setItem('JWTToken', token);
    
                // Redirect to different components based on user role
                navigate('/CRUD');
            } else {
                setLoginError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login request failed:', error);
            setLoginError('Login failed. Please try again later.');
        }
    }
    

    function decodeToken(token) {
        try {
            const parts = token.split('.');
            const decodedPayload = JSON.parse(atob(parts[1]));
            return decodedPayload;
        } catch (error) {
            console.error('Token decoding error:', error);
            return {};
        }
    }

    return (
        <div>
             <ResponsiveAppBar />
            <h2>Login</h2>
            <div>
                <label>Username:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                {loginError && <div className="text-danger">{loginError}</div>}
            </div>
            <div>
                <button onClick={handleSubmit}>Login</button>
            </div>
        </div>
    );
}

export default Login;
