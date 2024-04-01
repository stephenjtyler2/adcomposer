import { ImageAspectRatioOutlined } from '@mui/icons-material';
import {storeImage} from './blobstore';
import {saveImage} from './data';

import OpenAI from "openai";
const openai = new OpenAI({
    organization: process.env.OPEN_AI_ORGANIZATION
});

export async function POST(req: Request) {
    console.log("1")
    const {prompt} = await req.json();
    console.log("2")
    let generatorImageId = ""; // TODO: change this.
    let dbImgId = -1;

    console.log("3")
    // submit the prompt to dall-e api

    // TODO: make this async so we return a URL to check status of the image generation but don't block while this call runs - this can take real time.
    const imagesResponse : OpenAI.Images.ImagesResponse = await openai.images.generate({ 
        model: "dall-e-2", 
        prompt: prompt,
        n:1,
        response_format: 'b64_json'
        });

        console.log("4")
    const base64Img = imagesResponse.data[0].b64_json;
    console.log("5")

    // concert b64 encoded string to a blob...
    const base64Response = await fetch(`data:image/png;base64,${base64Img}`);
    const image = await base64Response.blob();

    // save the returned image to vercel blob storage (move to S3 later)
    const blobSaveData = await storeImage(generatorImageId, image);
   
    // save the metadata to db
    await saveImage({
        imageOrigin: 'Generated',
        imageGeneratorId:1,              // TODO: hard coding this for now
        prompt:prompt,
        generationDate:Date.now(),
        generationStatus:"Complete",     // When we make this async this initial insert will be "Pending" and it will be updated on the completion.
        imgUrl:blobSaveData.downloadUrl
    });

    // return the blob storage link and prompt to the client
    const res = {
        method: "POST",
        string: "hello",
        imgUrl: blobSaveData.downloadUrl
    }
    return Response.json(res)
}