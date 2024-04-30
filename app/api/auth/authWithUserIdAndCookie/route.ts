import { apiRouteAuthCheck} from "@backend/(utils)/(jwt)/tokenUtils";
import { getUserById } from "@backend/users/data";
import { doErrorResponse } from "@backend/(utils)/helpers";

// here we need to check if hte tokens in the auth cookie are valid and match 
// the userId passed in the post body.   If so return success, otherwise 401.
export async function POST(req: Request) {
    console.log("/api/authWithUserIdAndCookie");

    const authCheckResponse = apiRouteAuthCheck(req);
    if (!authCheckResponse.success) {
        return doErrorResponse(401);
    }

    try {
        const body = await req.json();
        const userId = parseInt(body.userId);
        if (userId == authCheckResponse.userId) {
            console.log("API:AuthWithUserIdAndCookie Successful Auth");
            const user = getUserById(userId);
            return Response.json(user);
        }
        else return doErrorResponse(401);
    }
    catch (e) {
        console.log("API:AuthWithUserIdAndCookie Could not parse request body");
        console.log(e);
        return doErrorResponse(401);
    }
}