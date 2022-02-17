import React, { useReducer } from 'react';

const LoginUseReducer = () => {

    // ACTIONS
    const FIELD = 'FIELD';
    const LOGIN = 'LOGIN';
    const SUCCESS = 'SUCCESS';
    const ERROR = 'ERROR';
    const LOGOUT = 'LOGOUT';

    // INITIAL STATE
    const initialState = {
        username: '',
        password: '',
        error: '',
        isLoading: false,
        isLoggedIn: false
    }

    // REDUCER
    const loginReducer = (state, action) => {
        switch (action.type) {
            case FIELD:
                return {
                    ...state,
                    [action.payload.fieldName] : action.payload.fieldValue
                }
            case LOGIN:
                return {
                    ...state,
                    error: '',
                    isLoading: true
                }
            case SUCCESS:
                return {
                    ...state,
                    error: '',
                    isLoading: false,
                    isLoggedIn: true,
                }
            case ERROR:
                return {
                    ...state,
                    error: `Invalid username or password`,
                    isLoading: false,
                    isLoggedIn: false,
                    username: '',
                    password: ''
                }
            case LOGOUT:
                return {
                    ...state,
                    isLoggedIn: false,
                }
            
            default:
                break;
        }
    }

    const [state, dispatch] = useReducer(loginReducer, initialState)

    // Get all the variables from state
    const {username, password, error, isLoading, isLoggedIn} = state;

    // Submit function
    const submit = async (e) => {
        e.preventDefault();
        dispatch({type: LOGIN})
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
            dispatch({type: SUCCESS})
        } catch (error) {
            dispatch({type: ERROR})
        }
    }

    const logout = () => {
        dispatch({type: LOGOUT})
    }

    return (
        <div className='App'>
            {
                isLoggedIn ?
                (
                    <div>
                        <h1>Welcome, {state.username}</h1>
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
                                dispatch({
                                    type: FIELD,
                                    payload: {
                                        fieldName: 'username',
                                        fieldValue: e.currentTarget.value
                                    }
                                })
                            }}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            value={ password }
                            onChange={(e) => {
                                dispatch({
                                    type: FIELD,
                                    payload: {
                                        fieldName: 'password',
                                        fieldValue: e.currentTarget.value
                                    }
                                })
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

export default LoginUseReducer;
