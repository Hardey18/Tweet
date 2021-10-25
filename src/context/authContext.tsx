import React, { useState, createContext } from 'react';

interface testInterface {
    authState: { token: string | null; }; 
    setAuthState: (token: any) => void; 
    isAuthenticated: () => boolean;
}

const defaultName: testInterface = {
    authState: { token: ""},
    isAuthenticated: () => false,
    setAuthState: () => console.log("hello"),
}

const AuthContext = createContext(defaultName);
const { Provider } = AuthContext;

const AuthProvider = ({ children }: any) => {
    const token = localStorage.getItem('token')
    const [authState, setAuthState] = useState({
        token: token ? token : null,
    })
    const isAuthenticated = () => {
        if(!authState.token) {
            return false
        } else {
            return true
        }
    }

    const setToken = (data: string) => {
        localStorage.setItem('token', data)

        setAuthState({token: data})
    }

    return (
        <Provider
            value={{
                authState,
                setAuthState: (token) => setToken(token),
                isAuthenticated
            }}
        >
            {children}
        </Provider>
    )
}

export { AuthContext, AuthProvider }