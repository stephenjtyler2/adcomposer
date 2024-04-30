import sharp from 'sharp';

export async function makeThumbnail (image: ArrayBuffer) : Promise<Buffer | null> {

    try{
        const thumbnail = await sharp(image).resize(250).toBuffer();
        return thumbnail;
    }
    catch(e) {
        console.log("Error creating thumbnail");
        console.log(e);
        return null;
    }
}