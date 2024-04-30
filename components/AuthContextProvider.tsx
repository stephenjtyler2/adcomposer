// providers.js (app directory)
'use client'
import { createContext, useEffect, useState } from 'react';
import { ApiUser } from '@backend/apitypes';
import Cookies from 'js-cookie';
import { authenticateWithUserIdAndCookie } from './apiClient/auth';

export type AuthContextType = {
    user: ApiUser | null,
    userLoggedIn: (user: ApiUser) => void,
    userLoggedOut: () => void,
}
export const AuthContext = createContext<AuthContextType>({ user: null, userLoggedIn: () => { }, userLoggedOut: () => { } });

// This component maintains the state for which user is logged in.   This, as well as functions to update that state are provided though a context object.
// Those are called login and from the page header drop down menu option for logout respectively.

export default function ({ children }: React.PropsWithChildren) {

    const [authContext, setAuthContext] = useState<AuthContextType>({
        user: null,
        userLoggedIn: (user: ApiUser) => {
            setAuthContext({ ...authContext, user: user });
            localStorage.setItem("loggedInUser", `${user.id}`);
        },
        userLoggedOut: () => {
            // clear the auth cookies (access token and refresh token)
            // this is not done server side because we do not make a call
            // on the server to do logout (at the moment, may change this later)
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");

            // Clear the record of the logged in User from local storage
            localStorage.removeItem("loggedInUser");

            // Zero out the Auth Context.  This will force a re-render of 
            // everything under AuthContextProvider and PageContainer will
            // redirect to /login.
            setAuthContext({ ...authContext, user: null })
        }
    });

    // This useEffect is fired with authContext changes and is handling the case
    // of initial page load where the authContext is not set but the user may have 
    // valid auth cookies - e.g. the user did a browser refresh.
    useEffect(()=> {
        if (!authContext.user) {
            // Auth context not set
            const localStorageUserId = localStorage.getItem("loggedInUser");
            if (localStorageUserId) {
                const userId = parseInt(localStorageUserId);
                if (!isNaN(userId)) {
                    // we have a valid user Id in localstorage
                    // see if we have auth cookies with valid tokens...
                    authenticateWithUserIdAndCookie(userId)
                    .then(user => {
                        if (user) {
                            // successfully authenticated
                            setAuthContext({ ...authContext, user: user });
                        } 
                        else {
                            // auth cookies will have been removed by the server side
                            // just need to clean up local storage
                            localStorage.removeItem("loggedInUser");
                        }
                    })
                    .catch (e=> {
                        console.log(e);
                    })
                }
            }
    
        }
    }, [authContext] );


    // console.log("AuthContextProvider render");
    // console.log(authContext.user);
    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    )
}