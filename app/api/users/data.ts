import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUserById(userId: number) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    return user;
}

// export async function getAllUsers() {
//     const allUsers = await prisma.user.findMany()
//     console.log(allUsers);
//     return allUsers;
// }