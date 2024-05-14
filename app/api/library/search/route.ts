import { apiRouteAuthCheck } from "@backend/(utils)/(jwt)/tokenUtils";
import { ApiLibrarySearchResults } from "@backend/apitypes";
import { librarySearch } from "./data";

export async function POST(req: Request) {
    console.log("library search called");

    const authCheckResponse = apiRouteAuthCheck(req);
    if (!authCheckResponse.success) return Response.json({}, { status: 401 });

    const { assetTypeFilters, searchString } = await req.json();

    const results = await librarySearch(authCheckResponse.tenantId, assetTypeFilters, searchString );

    return Response.json(results,{status:200});
}