import { ApiAuthSimpleCredentials, ApiUser } from "@backend/apitypes";
import { authenticateWithCreds } from "../data";
import { headers, cookies } from "next/headers";
import { doErrorResponse, getDomainNameFromHostName } from "@backend/(utils)/helpers";
import { getTenantByHostname } from "@backend/tenant/data";
import { makeJWTAccessToken, makeJWTRefreshToken } from "@backend/(utils)/(jwt)/tokenUtils";


export async function POST(req: Request) {
    console.log("/api/authWithCredentials");

    const creds = await req.json() as ApiAuthSimpleCredentials;

    const headersList = headers();
    const hostname = headersList.get('host');

    if (!hostname) return doErrorResponse(401);
    
    const domainName = getDomainNameFromHostName(hostname);
    const tenant = await getTenantByHostname(domainName);

    if (!tenant) return doErrorResponse(401);
    
    // console.log(tenant);
    const user: ApiUser | null = await authenticateWithCreds(tenant?.id, creds.username, creds.password);

    // console.log('after authenticate');
    // console.log(user);

    if (user) {
        const accessToken:string = makeJWTAccessToken(user);
        const refreshToken:string = makeJWTRefreshToken(user);
        
        cookies().set({
            name: 'accessToken',
            value: accessToken,
        });
        cookies().set({
            name: 'refreshToken',
            value: refreshToken,
        });

        return Response.json(user);
    }
    else {
        return doErrorResponse(401);
     }
}

