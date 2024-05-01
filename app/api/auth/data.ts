import { ApiUser } from '@backend/apitypes';
import { PrismaClient } from '@prisma/client';
import { sha256 } from 'js-sha256';
const prisma = new PrismaClient();

// for a given username and password, if the identity/user is found and the password is right, returns the ApiUser object
// which combines in a single object everything the client side needs to know about the user that is associated to the identity
// that successfully authenticated.    For more on identities vs users, see the comments in schema.prisma.
export async function authenticateWithCreds(tenantId: number, username: string, password: string): Promise<ApiUser | null> {
    const identity = await prisma.identity.findUnique({
        where: {
            authUsername: username
        }
    })

    if (!identity) return null;

    console.log(`found identity: ${identity.id}`);

    const passwordHash = sha256(`${password}${identity.authSalt}`);
    if (passwordHash != identity.authPasswordHash) return null;
    
    const user = await prisma.user.findFirst({  // there shoudl be 0 or 1 users returned.  Combo of tenantId/identityId should be unique.
        where: {
            tenantId: tenantId,
            identityId: identity.id
        }
    });

    if (!user) return null;

    return ({
        id: user.id,
        name: identity.idpProfileName??"",
        email: identity.idpProfileEmail,
        avatarImageUrl: identity.idpProfilePictureUrl??""
    });
}