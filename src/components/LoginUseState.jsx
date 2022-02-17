import React, { useState } from 'react';

const LoginUseState = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const submit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await function login({username, password}){
                new Promise((res, reject) => {
                    setTimeout(() => {
                        if(username === 'admin' && password === 'admin') {
                            res()
                        } else {
                            reject()
                        }
                    }, 2000);
                })
            };
            setIsLoggedIn(true);
            setIsLoading(false);
        } catch (error) {
            setError(`Invalid username or password: ${error}`);
            setIsLoading(false);
            setIsLoggedIn(false);
            setUsername('');
            setPassword('');
        }
    }

    const logout = () => {
        setIsLoggedIn(false);
        setIsLoading(false);
    }

    return (
        <div className='App'>
            {
                isLoggedIn ?
                (
                    <div>
                        <h1>Welcome, {username}</h1>
                        <button onClick={logout}>Log Out</button>
                    </div>
                )
                :
                (
                    <form onSubmit={submit}>
                        {
                            error && <p style={{color: 'tomato'}}>{error}</p>
                        }
                        <input
                            type='text'
                            placeholder='Username'
                            value={ username }
                            onChange={(e) => {
                                setUsername(e.currentTarget.value)
                            }}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            value={ password }
                            onChange={(e) => {
                                setPassword(e.currentTarget.value)
                            }}
                        />
                        <button type='submit'>
                            {
                                isLoading ? 'Logging in...' : 'Log In'
                            }
                        </button>
                    </form>
                )
            }
        </div>
    );
}

export default LoginUseState;
