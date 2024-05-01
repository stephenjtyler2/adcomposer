import { ApiUser } from "@backend/apitypes";
import { createContext } from "react";

export type AuthContextType = {
    user: ApiUser | null,
    userLoggedIn: (user: ApiUser) => void,
    userLoggedOut: () => void,
}

export const AuthContext = createContext<AuthContextType>({ user: null, userLoggedIn: () => { }, userLoggedOut: () => { } });