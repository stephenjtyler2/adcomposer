import { ApiTenant } from "@backend/apitypes";

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
