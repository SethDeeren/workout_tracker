import React, {useState, useEffect} from 'react';

let logoutTimer: ReturnType<typeof setTimeout>;


type AuthContextObj = {
    token: string | null;
    isLoggedIn: boolean;
    login: (token: string, expiresIn: string) => void;
    logout: () => void;
}

export const AuthContext = React.createContext<AuthContextObj>({
    token: '',
    isLoggedIn: false,
    login: (token: string, expiresIn: string) => {},
    logout: () => {}
});

const calculateTokenTime = (expirationTime: string | null) => {
    if(expirationTime === null) {
        return 0;
    }
    const currentTime = new Date().getTime();
    const adjustedExperationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjustedExperationTime - currentTime;

    return remainingDuration;
}

const retrieveStoredToken = () =>  {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime'); 

    const remainingTime = calculateTokenTime(storedExpirationDate);

    // If user only has minute remaining on token have them re login
    if(remainingTime <= 6000) { 
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return {
            token: null,
            duration: null
        };
    }

    return {
        token: storedToken,
        duration: remainingTime
    }


}

const AuthContextProvider: React.FC<{children: React.ReactNode}> = (props) => {
    const tokenData = retrieveStoredToken();
    const initialToken = localStorage.getItem('token');
    const [token, setToken] =   useState<string | null>(initialToken);

    const userIsLoggedIn: boolean = !!token;

    
    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        if(logoutTimer) {
            clearTimeout(logoutTimer);
        }
    };

    const loginHandler = (token: string, experationTime: string) => {
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', experationTime);
        
        const remaingTime = calculateTokenTime(experationTime);
        logoutTimer = setTimeout(logoutHandler, remaingTime);
    };

    useEffect(() => {
        console.log(tokenData.duration);
        logoutTimer = setTimeout(logoutHandler, tokenData.duration!);
    }, [tokenData]);

    const contextValue: AuthContextObj = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }


    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContextProvider;