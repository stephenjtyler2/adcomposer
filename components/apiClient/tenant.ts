import { ApiTenant } from "@backend/apitypes";

// This call does not require authcontext - it gets called before login
// to load tenant context (based on a lookup of the subdomain used to access the app)
export async function getTenant() : Promise<ApiTenant|null> {
    const response = await fetch("/api/tenant");
    if (response.ok) {
        const {tenant} = await response.json();
        return tenant;
    }
    else {
        console.log('cannot find tenant');
        return null;
    }
}
