import { ApiUser } from "@backend/apitypes";

// Used at app startup to check if we have valid auth cookie for the userId recorded
// in localstorage as the logged in user.
export async function authenticateWithUserIdAndCookie(userId: number) : Promise<ApiUser|null> {
    return fetch ('/api/auth/authWithUserIdAndCookie', {
        method: "POST",
        body: JSON.stringify ({userId:userId})
    })
    .then(async(response)=> {
        if (!response || !response.ok || response.status==401) {
            console.log('call to authWithUserIdAndCookie failed');
            return null;
        }

        const user = await response.json();
        if (user) {
            // console.log('user auth successful');
            // console.log(user);
            return user;
        }
        else {
            // console.log('user failed to auth');
            return null;
        }
    })
}


// Used to login with username and password
export async function authenticateWithCreds(username: string, password: string) : Promise<ApiUser|null> {
    return fetch ('/api/auth/authWithCredentials', {
        method: "POST",
        body: JSON.stringify ({username: username, password: password})
    })
    .then(async(response)=> {
        if (!response || !response.ok || response.status==401) {
            console.log('call to authWithCredentials failed');
            return null;
        }

        const user = await response.json();
        if (user) {
            // console.log('user auth successful');
            // console.log(user);
            return user;
        }
        else {
            // console.log('user failed to auth');
            return null;
        }
    })
}