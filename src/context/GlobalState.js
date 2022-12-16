import { createContext, useEffect, useReducer } from "react";
import { Navigate, useNavigate } from "react-router-dom";


const END_POINT = "http://localhost:5000/";

const globalActions = {
    START_REGISTERING: "START_REGISTERING",
    REGISTER: "REGISTER",
    LOGIN: "LOGIN",
    UPDATE_AUTH: "UPDATE_AUTH",
    LOGOUT: "LOGOUT",
    LOAD_GOALS: "LOAD_GOALS",
    SET_GOAL: "SET_GOAL",
    RESET: "RESET",
    LOADIING: "LOADING"
}

function globalReducer(state, action) {
    switch (action.type) {
        case globalActions.REGISTER:
            return {...state, authData: action.payload}
            break;
        case globalActions.LOGIN:
            return {...state, authData: action.payload}
            break;
        case globalActions.START_REGISTERING:
            return {...state, start_registering: true}
            break;
        case globalActions.UPDATE_AUTH:
            return {...state, authData: action.payload}
        break;
        case globalActions.LOAD_GOALS:
            return {...state, goals: [...action.payload]}
        break;
        case globalActions.SET_GOAL:
            return {...state, goals: [...state.goals, action.payload]}
        break;
        case globalActions.RESET:
            return {...state, goals: []}
        break;
        case globalActions.LOGOUT:
            return {...state, authData: {token: null}}
        break;
        case globalActions.LOADIING:
            return {...state, loading: action.payload}
        break;
        default:
            break;
    }
}

export const globalContext = createContext();

function token() {
    return JSON.parse(localStorage.getItem("user")).token;
}


export const GlobalProvider = ({children}) => {
    const initialState = {
        authData: {token: null},
        goals: [],
        start_registering: false,
        start_logging: false,
        loading: false
    }


    useEffect(() => {
        loadUserStorage();
    }, [token]);

    function loadUserStorage() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            dispatch({type: "UPDATE_AUTH", payload: user});
        }

        console.log(initialState);
    }


    async function getUsers() {
        const response = await fetch(`${END_POINT}api/users`);
        const data = await response.json();
  
        return data;
    }

    async function getCurrentUser() {
        const response = await fetch(`${END_POINT}api/me`);
        const data = await response.json();
    }

    async function login(userInfo) {
        try {
            const res = await fetch(`${END_POINT}api/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userInfo)
    
            });
            const data = await res.json();
            dispatch({type: globalActions.LOGIN, payload: data})
            localStorage.setItem("user", JSON.stringify(data));
        } catch (error) {
            console.log(error.message);
        }

    }

    async function register(userInfo) {
        dispatch({type: globalActions.START_REGISTERING})
        const res = await fetch(`${END_POINT}api/register`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userInfo)

        });
        const data = await res.json();
        dispatch({type: globalActions.REGISTER, payload: data})
        localStorage.setItem("user", JSON.stringify(data));
    }

    function logout() {
        localStorage.removeItem("user");
        dispatch({type: globalActions.RESET});
        dispatch({type: globalActions.LOGOUT});
    }

    async function submitGoal(goal) {
        const res = await fetch(`${END_POINT}api/goals`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token()}`
            },
            body: JSON.stringify(goal)

        });
        const data = await res.json();
        dispatch({type: globalActions.SET_GOAL, payload: data});
    }

    async function fetchGoals() {
        try {
            const res = await fetch(`${END_POINT}api/goals`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token()}`
                }
            });
            const data = await res.json();
            dispatch({type: globalActions.LOAD_GOALS, payload: data});
        } catch (error) {
            console.log(error);
        }
    }

    async function getSingleGoal(id) {
        try {
            const res = await fetch(`${END_POINT}api/goals/${id}`, {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token()}`
                }
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteGoal(id) {
        try {
            const res = await fetch(`${END_POINT}api/goals/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token()}`
                }
            });
            await res.json();
        } catch (error) {
            console.log(error);
        }
    }



    const [state, dispatch] = useReducer(globalReducer, initialState);

    return (
        <globalContext.Provider value={{...state, getUsers, register, login, logout, loadUserStorage, getCurrentUser, submitGoal, fetchGoals, getSingleGoal, deleteGoal, dispatch}}>
            {children}
        </globalContext.Provider>
    );
}