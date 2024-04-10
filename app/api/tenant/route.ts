
import { headers } from "next/headers"
import { getTenantByHostname } from "./data";

export async function GET(req: Request) {
    console.log("API: GET /api/tenant");
    const headersList = headers();
    let clientHost = headersList.get('host');
    if (clientHost && clientHost.indexOf(":")>-1 ) {
        clientHost = clientHost.split(":")[0];

    }
    console.log(clientHost);
    const tenant = await getTenantByHostname(clientHost??"");
    console.log(tenant);

    return Response.json({status:200, tenant: tenant});
}