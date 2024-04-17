
import { headers } from "next/headers"
import { getTenantByHostname } from "./data";
import { getDomainNameFromHostName } from "@backend/(utils)/helpers";

// this route is not auth-protected.   It is called from the client when first accessed to determine what tenant context it shoudl display in, based on the hostname it was accessed on.
// DO NOT auth protect this route.
// DO NOT add anything sensitive/confidential to the data returned from this route.   It should really just be minimal info to drive the display/functionality of the login page based on how this tenant
// is configured. 
export async function GET(req: Request) {
    const headersList = headers();
    const hostname = headersList.get('host');
    if (hostname) {
        const domainName= getDomainNameFromHostName(hostname);
        const tenant = await getTenantByHostname(domainName);
        return Response.json({status:200, tenant: tenant});
    }
    else return Response.json({status:400});
}