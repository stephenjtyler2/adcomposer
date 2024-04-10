import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getTenantByHostname(hostname:string) {
    const tenant = await prisma.tenant.findUnique({
        where: {hostname:hostname}
    })
    return tenant;
}