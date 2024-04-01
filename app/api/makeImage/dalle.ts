import OpenAI from "openai";
const openai = new OpenAI({
    organization: process.env.OPEN_AI_ORGANIZATION
});

export async function makeImageDalleSync(version:2|3, prompt:string) {
    const imagesResponse : OpenAI.Images.ImagesResponse = await openai.images.generate({ 
        model: `dall-e-${version}`, 
        prompt: prompt,
        n:1,
        response_format: 'b64_json'
    });

    const base64Img = imagesResponse.data[0].b64_json;

    // concert b64 encoded string to a blob...
    const base64Response = await fetch(`data:image/png;base64,${base64Img}`);
    return await base64Response.blob();
}
