import { PrismaClient, Tenant } from '@prisma/client';

const prisma = new PrismaClient();

export async function getTenantByHostname(hostname:string) : Promise<Tenant | null> {
    const tenant = await prisma.tenant.findUnique({
        where: {hostname:hostname}
    })
    return tenant;
}

export async function getTenantById(tenantId:number) : Promise<Tenant | null> {
    const tenant = await prisma.tenant.findUnique({
        where: {id: tenantId}
    })
    return tenant;
}