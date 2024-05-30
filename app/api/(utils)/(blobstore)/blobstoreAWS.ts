import {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand
  } from "@aws-sdk/client-s3";

import { ImageOrigin } from '@backend/apitypes';
import { makeThumbnail } from "../(images)/imageUtils";

type SaveStatus = "Complete" | "Failed";
export type BlobSaveData = {
    saveStatus: SaveStatus,
    downloadUrl: string,
    path: string
}

const client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
    }
});

export async function deleteImageBlob(path: string) : Promise<boolean> {
    let success:boolean=false;
    console.log(`delete image blob at path: ${path}`);

    try {
        const response = await client.send(new DeleteObjectCommand({ 
            Bucket: process.env.AWS_S3_BUCKET_NAME, 
            Key: path}));
        console.log(response);
        success=true;
    }
    catch(se) {
        console.log("S3 Service Exception");
        console.log(se);
    }
    return success;
}
export async function storeImageBlob(filename:string, image:Blob, imageOrigin: ImageOrigin) : Promise<BlobSaveData> {

    const path = `images/${imageOrigin.toLowerCase()}/${filename}`;
    const thumbnailPath = `images/${imageOrigin.toLowerCase()}/tn_${filename}`;

    console.log(`Saving image to path: ${path}`);

    let saveStatus : SaveStatus ="Complete";

    try {
        const imageBuffer = await image.arrayBuffer();
        
        console.log("sending main image to S3");        
        await client.send(new PutObjectCommand({ 
            Bucket: process.env.AWS_S3_BUCKET_NAME, 
            Key: path, 
            // @ts-ignore
            Body:imageBuffer}));   
        
        console.log("creating thumbnail");
        const thumbnailImageBuffer = await makeThumbnail(imageBuffer);
        
        if (thumbnailImageBuffer) {
            console.log("sending thumnail image to S3");        
            await client.send (new PutObjectCommand({ 
                Bucket: process.env.AWS_S3_BUCKET_NAME, 
                Key: thumbnailPath, 
                // @ts-ignore
                Body:thumbnailImageBuffer}));
        }
        else {
            console.log("Unable to create thumbnail");
        }
    }   
    catch(se) {
        console.log("S3 Service Exception");
        console.log(se);
        saveStatus="Failed";
    }

    return {
        saveStatus: saveStatus,
        downloadUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${path}`,
        path: path  
    };
}
