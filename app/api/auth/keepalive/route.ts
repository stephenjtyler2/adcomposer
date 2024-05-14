import { apiRouteAuthCheck } from "@backend/(utils)/(jwt)/tokenUtils";
import { doErrorResponse } from "@backend/(utils)/helpers";

export async function GET(req: Request) {
    console.log("/api/keepalive");

    const authCheckResponse = apiRouteAuthCheck(req);
    if (!authCheckResponse.success) {
        return doErrorResponse(401);
    }
    return Response.json({}, {status:200});
}