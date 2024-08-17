import React, { useState } from 'react';
import '../style/AuthScreen.css'; // Optional: For styling


const AuthScreen = ({onAuthenticate,setproductList }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    // Handle form submission
    const handleSubmit = async (e) => {
         e.preventDefault();
        try {
            const credentials = btoa(`${username}:${password}`);
            const response =  await fetch('http://localhost:3001/getProducts', {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin":  "*"
                },
            })
            

            if (response.ok ) {
                document.cookie = `auth=${credentials}   `;
             // Notify parent of successful authentication
                const jsonresult = await response.json();
                console.log(jsonresult)
                setproductList( {...jsonresult })
                onAuthenticate(); 
            } else {
                setError(response.message || 'Authentication failed');
            }
        } catch (error) {
            setError('An error occurred while trying to authenticate');
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AuthScreen;
