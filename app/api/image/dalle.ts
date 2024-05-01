import { isNumeric } from "@backend/(utils)/helpers";

import OpenAI from "openai";
const openai = new OpenAI({
    organization: process.env.OPEN_AI_ORGANIZATION
});


export async function makeImageDalleSync(prompt: string, aspectRatio:"portrait"|"landscape"|"square") {
    // submit the prompt to dall-e api
    const dalleVersionString = process.env.NEXT_PUBLIC_DALL_E_VERSION;
    let dalleVersion: number = 2;
    if (dalleVersionString && isNumeric(dalleVersionString)) {
        dalleVersion = parseInt(dalleVersionString);
    }

    // Dalle 2 can only do square at 256x256, 512x512 or 1024x1024.    In all cases with this we will do 1024x1024
    // Dalle 3 can only do 1024x1024 or 1792x1024 or 1024x1792, and we'll select those based on aspectRatio field.

    let size : "1024x1024" | "256x256" | "512x512" | "1792x1024" | "1024x1792" | null | undefined = "1024x1024";
    if (dalleVersion == 3) {
        if (aspectRatio == "portrait") size="1024x1792";
        else if (aspectRatio == "landscape") size = "1792x1024"; 
    }

    try {
        const imagesResponse: OpenAI.Images.ImagesResponse = await openai.images.generate({
            model: `dall-e-${dalleVersion}`,
            prompt: prompt,
            n: 1,
            size: size,
            response_format: 'b64_json'
        });
        const base64Img = imagesResponse.data[0].b64_json;

        // concert b64 encoded string to a blob...
        const base64Response = await fetch(`data:image/bmp;base64,${base64Img}`);
        return await base64Response.blob();
    }
    catch (e) {
        console.log("Error from OpenAI API");
        throw(e);
    }
}
