import { PrismaClient } from '@prisma/client';
import { ApiImage } from '../../apitypes';


const prisma = new PrismaClient();

export async function getImage( imageId : number ) {
    return await prisma.image.findUnique({
        where: {id:imageId}
    });
}

export async function saveImage(img: ApiImage) : Promise<ApiImage> {
    const image = await prisma.image.create({ data: img });
    console.log(image);
    return image;
}

export async function addImageToLibrary(imgId: number, libraryId: number) {
    return await prisma.image.update({
        where: {id:imgId},
        data: {libraryId: libraryId}
    })
}

export async function deleteImage(imgId: number) : Promise<boolean>{
    let success=false;
    try {
        // disconnect from a library if it's one
        const updateImage =  prisma.image.update({
            where: {id:imgId},
            data: {libraryId:null}
        })

        // later will need to disconnect it from any ads it is used in also
        const deleteImage =  prisma.image.delete({
            where: {
                id: imgId
            }
        })

        await prisma.$transaction([updateImage,deleteImage])
        success=true;
    }
    catch (e) {
        console.log(e);
    }

    console.log(`after transaction returning ${success}`)
    return success;

}
