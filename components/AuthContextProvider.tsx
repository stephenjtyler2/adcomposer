// providers.js (app directory)
'use client'
import { createContext,useState} from 'react';
import { ApiUser } from '@backend/apitypes';
import Cookies from 'js-cookie';

export type AuthContextType = {
    user: ApiUser | null,
    userLoggedIn: (user:ApiUser)=> void,
    userLoggedOut: ()=> void,
}
export const AuthContext = createContext<AuthContextType>({user:null, userLoggedIn:()=>{}, userLoggedOut: ()=> {}});

// This component maintains the state for which user is logged in.   This, as well as functions to update that state are provided though a context object.
// Those are called login and from the page header drop down menu option for logout respectively.

export default function ({children}: React.PropsWithChildren) {

    const [authContext, setAuthContext] = useState<AuthContextType>({
        user:null, 
        userLoggedIn: (user: ApiUser) => {
            setAuthContext({...authContext, user: user })
        },
        userLoggedOut: () => {
            // clear the auth cookies (access token and refresh token)
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");

            // Zero out the Auth Context (this will force a re-render of everything under AuthContextProvider and PageContainer will redirect to /login)
            setAuthContext({...authContext, user: null})
        }
    });

    console.log("AuthContextProvider render");
    console.log(authContext.user);
    return (
        <AuthContext.Provider value = {authContext}>
            {children}
        </AuthContext.Provider>
    )
}