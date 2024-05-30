import { PrismaClient } from '@prisma/client';
import { ApiImage } from '../../apitypes';

const prisma = new PrismaClient();

export async function getImage(imageId: number): Promise<ApiImage | null> {
    const image = await prisma.image.findUnique({
        where: { id: imageId }
    });

    if (image) {
        return {
            id: image.id,
            imageOrigin: image.imageOrigin,
            createdById: image.createdById,
            prompt: image.prompt,
            createDate: image.createDate,
            createStatus: image.createStatus,
            imgUrl: image.imgUrl,
            libraryId: image.libraryId,
            path: image.path
        }
    }
    return null;
}

export async function saveImage(img: ApiImage): Promise<number> {
    const image = await prisma.image.create({ data: img });
    console.log(image);
    return image.id;
}

export async function addImageToLibrary(imgId: number, userId: number): Promise<ApiImage> {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) throw ("AddImageToLibrary: Cannot find user");

    const library = await prisma.library.findUnique({
        where: { tenantId: user.tenantId }
    })

    if (!library) throw (`Cannot find library for the user: ${user.id} in tenant ${user.tenantId}`);

    const updatedImage = await prisma.image.update({
        where: { id: imgId },
        data: { libraryId: library.id }
    });
    return updatedImage;
}

export async function deleteImage(imgId: number): Promise<boolean> {
    let success = false;
    try {
        // disconnect from a library if it's one
        const updateImage = prisma.image.update({
            where: { id: imgId },
            data: { libraryId: null }
        })

        // later will need to disconnect it from any ads it is used in also
        const deleteImage = prisma.image.delete({
            where: {
                id: imgId
            }
        })

        await prisma.$transaction([updateImage, deleteImage])
        success = true;
    }
    catch (e) {
        console.log(e);
    }

    console.log(`after transaction returning ${success}`)
    return success;

}
