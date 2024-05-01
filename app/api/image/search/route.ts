import { apiRouteAuthCheck } from "@backend/(utils)/(jwt)/tokenUtils";
import { ApiImage } from "@backend/apitypes";

export async function GET(req: Request) {
    console.log("image searh called");

    const authCheckResponse = apiRouteAuthCheck(req);
    if (!authCheckResponse.success) return Response.json({}, { status: 401 });


    const imageResults = [] as ApiImage[];
    return Response.json(imageResults,{status:200});
}