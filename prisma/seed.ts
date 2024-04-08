import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();
async function main () {
    const t = await loadSeedTenants();
    const tenantId = t[0].id;

    await loadSeedLibrary(tenantId);
    await loadSeedUsers(tenantId);
}


async function loadSeedTenants () {
    const t = await prisma.tenant.upsert ({
        where: { name: "Acme Corporation" },
        update: {},
        create: {
            name: "Acme Corporation",
            library: {
                
            }
        }
    })
    return [t];
    
}

async function loadSeedLibrary(tenantId:number) {
    const l = await prisma.library.upsert({
        where: {tenantId: tenantId},
        update: {},
        create: {tenantId: tenantId}
    })
}

async function loadSeedUsers (tenantId: number) {
    const {id:identityId} = await prisma.identity.upsert (
        {
            where: {
                idpIdentityId: "localIDP-seedIdentity-1",
            },
            update: {},
            create: {
                idpIdentityId: "localIDP-seedIdentity-1",
                idpUrl: "local",
                name: 'Stephen Tyler',
                email: 'stephenjtyler@gmail.com',
            }
        }
    );

    // Can't use upsert because the constraints are such that tenantId and identityId are unique in combination, but neither is @unique in the schema
    // so where does not see the combo as unique.   So have to try to read and if not found, insert.
    let user  = await prisma.user.findFirst({
        where: {
            tenantId: tenantId,
            identityId:identityId,
        }
    });
    if (!user) {
        user = await prisma.user.create ( {
            data: {
                tenantId: tenantId,
                identityId: identityId,
            }
        })
    }

    return [user];
}

main()
.then(async()=> {
    await prisma.$disconnect()
})
.catch(async(e)=> {
    console.error(e);
    await prisma.$disconnect()
    process.exit(1)
})