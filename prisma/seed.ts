import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();
async function main () {
    const t = await loadSeedTenants();
    console.log("db seed: complete");
}


async function loadSeedTenants () {

    console.log("db seed: creating tenant 1");
    const t1 = await prisma.tenant.upsert ({
        where: { name: "Acme Corporation" },
        update: {},
        create: {
            name: "Acme Corporation",
            hostname: "acme.adcomposer.com",
            library: {
                
            }
        }
    })

    console.log("db seed: creating tenant 2");
    const t2 = await prisma.tenant.upsert ({
        where: { name: "XYZ Biotronics PLC" },
        update: {},
        create: {
            name: "XYZ Biotronics PLC",
            hostname: "xyz.adcomposer.com",
            library: {
                
            }
        }
    })

    await loadSeedLibrary(t1.id);
    await loadSeedUsers(t1.id);
    
}

async function loadSeedLibrary(tenantId:number) {
    console.log(`db seed: creating library for tenant ${tenantId}`);

    const l = await prisma.library.upsert({
        where: {tenantId: tenantId},
        update: {},
        create: {tenantId: tenantId}
    })
}

async function loadSeedUsers (tenantId: number) {
    console.log(`db seed: creating seed identity tenant ${tenantId}`);
    const {id:identityId} = await prisma.identity.upsert (
        {
            where: {
                authUsername: "styler",
            },
            update: {
                authSalt: 'abcd',
                authPasswordHash: 'e5c712aa094c26e68a4b8fcd6c5ea72a8d722fd238e6102ae219a04ea041f797',
                idpProfileName: "Stephen Tyler",
                idpProfileEmail: 'stephenjtyler@gmail.com',
            },
            create: {
                authUsername: 'styler',
                authSalt: 'abcd',
                authPasswordHash: 'e5c712aa094c26e68a4b8fcd6c5ea72a8d722fd238e6102ae219a04ea041f797',
                idpProfileName: "Stephen Tyler",
                idpProfileEmail: 'stephenjtyler@gmail.com',
            }
        }
    );

    console.log(`db seed: creating seed user for idenrity ${identityId}`);
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