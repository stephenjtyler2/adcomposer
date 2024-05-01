// This is designed to be used in the then of a fetch to a protected api route
// e.g.
// fetch (myURL)
// .then(response=>handle401Response)
// .then(response=>)

import { AuthContextType } from "@/components/AuthContext";

export async function handleUnauthorized(response: Response, context: AuthContextType) : Promise<Response> {
       // If and only if the context is set (the app things we are logged in) and the response is 401 (we are not), handle the logout
       if (context && context.user && response && response.status == 401) {
        console.log("Session expired");
        // At some point add niceties of displaying a message to the user that their session has expired before the redirect
        context.userLoggedOut();
    }
    return response;
} 