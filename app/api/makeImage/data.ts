import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type imgType = {
    imageOrigin: 'Generated'|'Uploaded',
    imageGeneratorId:number,
    prompt:String,
    generationDate: Number,
    generationStatus: "Pending"|"Complete"|"Failed",
    imgUrl:String 
}

export async function saveImage(img: imgType) {
    const image = await prisma.image.create({data: img});
    return image;
}