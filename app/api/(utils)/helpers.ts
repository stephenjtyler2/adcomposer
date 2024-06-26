import { cookies } from "next/headers";

export function isNumeric(n: string) {
    const nf: number = parseFloat(n);
    return !isNaN(nf) && isFinite(nf);
}

export function getDomainNameFromHostName(hostname: string) {
    let clientHost = hostname;
    // strip off port if present...
    if (clientHost && clientHost.indexOf(":") > -1) {
        clientHost = clientHost.split(":")[0];
    }
    return clientHost;
}

export const doErrorResponse = async (statusCode:number) => {
    cookies().delete('accessToken');
    cookies().delete('refreshToken');
    return Response.json({}, { status: statusCode });
}