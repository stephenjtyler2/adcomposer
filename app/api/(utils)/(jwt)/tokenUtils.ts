import { ApiUser } from "@backend/apitypes";
import jsonwebtoken from 'jsonwebtoken';
import { cookies } from "next/headers";
const { sign, verify } = jsonwebtoken;

const defaultAccessTokenTTLSecs = "600"  // 10 minutes
const defaultRefreshTokenTTLSecs = "1800" // 30 minutes

const makeJwtToken = (payload: string | object | Buffer) => {
    if (!process.env.JWT_CURRENT_SIGNING_KEY) {
        console.log("JWT Current Signing Key Not Defined.   This MUST be defined as an environment variable.")
        throw ("Signing Key Undefined");
    }
    var token = sign(payload, process.env.JWT_CURRENT_SIGNING_KEY)
    return token;
}


export type ApiRouteAuthCheckResponse = {
    success: boolean,
    userId: number,
    tenantId: number,
}

export const apiRouteAuthCheck = (req: Request): ApiRouteAuthCheckResponse => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken");
    const refreshToken = cookieStore.get("refreshToken");

    const fail = {
        success: false,
        userId: -1,
        tenantId: -1,
    };

    if (!accessToken) return fail;

    // console.log('before access token verify');
    let decoded = verifyToken(accessToken.value);
    // console.log('after access token verify');
    // console.log(decoded);
    // @ts-ignore
    if (decoded && decoded.user && decoded.tenantId) {
        // @ts-ignore
        const user = decoded.user as ApiUser;
        // @ts-ignore
        const tenantId :number = decoded.tenantId;
        return {
            success: true,
            userId: user.id ?? -1,
            tenantId: tenantId ?? -1,
        }
    }

    // no juice with the access token, try the refresh token...  
    // NOTE: I HAVE NOT TESTED ANY OF THE REFRESH LOGIC / FUNCTIONALITY YET
    if (refreshToken && refreshToken.value) {
        // console.log('before refresh token verify');
        let decoded = verifyToken(refreshToken.value);
        // console.log('after refresh token verify');
        console.log("refresh token is good")
        // @ts-ignore
        if (decoded && decoded.user && decoded.tenantId) {
            console.log("refresh token is good, issuing new tokens");
            // @ts-ignore
            const user = decoded.user as ApiUser;
            // @ts-ignore
            const tenantId :number = decoded.tenantId;

            const newAccessToken = makeJWTAccessToken(tenantId, user);
            const newRefreshToken = makeJWTRefreshToken(tenantId, user);
            cookies().set("accessToken", newAccessToken);
            cookies().set("refreshToken", newRefreshToken);

            return {
                success: true,
                userId: user.id??-1,
                tenantId: tenantId??-1
            }
        }
        else return fail;
    }

    return fail;
}

export const verifyToken = (token: string) => {
    if (!process.env.JWT_CURRENT_SIGNING_KEY) {
        console.log("JWT Current Signing Key Not Defined.   This MUST be defined as an environment variable.")
        throw ("Signing Key Undefined");
    }

    let decoded;

    try {
        decoded = verify(token, process.env.JWT_CURRENT_SIGNING_KEY);
        return decoded;
    }
    catch (e) {
        console.log('attempt to decode with current signing key failed');
        console.log(e);
    }

    if (!process.env.JWT_PRIOR_SIGNING_KEY) {
        return null;
    }

    try {
        decoded = verify(token, process.env.JWT_PRIOR_SIGNING_KEY);
        return decoded;
    }
    catch (e) {
        console.log('attempt to decode with prior signing key failed');
        return null;
    }
}

export const makeJWTAccessToken = (tenantId: number, user: ApiUser) => {
    const accessTokenTTLMs = 1000 * parseInt(process.env.JWT_ACCESS_TTL_SECONDS ?? defaultAccessTokenTTLSecs);

    const payload = {
        user: user,
        tenantId: tenantId,
        exp: Math.floor((Date.now() + accessTokenTTLMs) / 1000)
    }

    return makeJwtToken(payload);
}

export const makeJWTRefreshToken = (tenantId:number, user: ApiUser) => {
    const refreshTokenTTLMs = 1000 * parseInt(process.env.JWT_REFRESH_TTL_SECONDS ?? defaultRefreshTokenTTLSecs);

    const payload = {
        user: user,
        tenantId: tenantId,
        exp: Math.floor((Date.now() + refreshTokenTTLMs) / 1000)
    }


    return makeJwtToken(payload);
}