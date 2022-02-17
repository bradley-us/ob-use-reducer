import React, { useReducer, useContext } from 'react';

// ACTIONS
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';

const myContext = React.createContext(null)

const Points = () => {
    const state = useContext(myContext);

    return (
        <p>{state.count}</p>
    )
}

const Counter = () => {

    // Initial State for Reducer
    const initialState = {
        txt: 'Contador',
        count: 0
    }

    // Reducer to change State
    const reducer = (state, action) => {
        switch (action.type) {
            case INCREMENT:
                return {
                    ...initialState,
                    count: state.count + action.payload.quantity
                }

            case DECREMENT:
                if(state.count > 0){
                    return {
                        ...initialState,
                        count: state.count - action.payload.quantity
                    }
                } else {
                    return state
                }

            case RESET:
                return {
                    ...initialState,
                    count: 0
                }
        
            default:
                return state;
        }
    }

    // Put useReducer to state, reducer and dispatch actions
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <myContext.Provider value={state}>
            <div>
                <h2>{state.txt}</h2>
                <Points />
                <button
                    onClick={
                        () => dispatch({
                            type: INCREMENT,
                            payload: {
                                quantity: 1
                            }
                        })
                    }
                >
                    Increment points!
                </button>
                <button
                   onClick={
                        () => dispatch({
                            type: DECREMENT,
                            payload: {
                                quantity: 1
                            }
                        })
                    }
                >
                    Decrement points!
                </button>
                <button
                    onClick={
                        () => dispatch({type: RESET})
                    }
                >
                    RESET these points!
                </button>
            </div>
        </myContext.Provider>
    );
}

export default Counter;
