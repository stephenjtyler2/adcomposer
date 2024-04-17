import { ApiUser } from "@backend/apitypes";

export async function authenticateWithCreds(username: string, password: string) : Promise<ApiUser|null> {
    return fetch ('/api/auth/authWithCredentials', {
        method: "POST",
        body: JSON.stringify ({username: username, password: password})
    })
    .then(async(response)=> {
        if (!response || !response.ok) {
            console.log('call to authWithCredentials failed');
            return null;
        }

        const user = await response.json();
        if (user) {
            console.log('user auth successful');
            console.log(user);
            return user;
        }
        else {
            console.log('user failed to auth');
            return null;
        }
    })
}