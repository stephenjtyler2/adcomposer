import {v4 as uuidv4} from 'uuid';
import {storeImage} from './blobstore';
import {saveImage} from './data';
import {makeImageDalleSync} from './dalle';

export async function POST(req: Request) {
    const {prompt} = await req.json();

    // TODO: the openai call can take 5-10 seconds.   So make this async - save image in db first as pending, then submit this 
    // and have it update the db upon completion. 

    // submit the prompt to dall-e api
    const generationDate = Date.now();
    const image = await makeImageDalleSync(process.env.DALL_E_VERSION,prompt); 
    
    // save the returned image to blob storage 
    const id = uuidv4();
    const blobSaveData = await storeImage(id,image);
   
    // save the metadata to db
    await saveImage({
        imageOrigin: 'Generated',
        imageGeneratorId:id,              // TODO: hard coding this for now
        prompt:prompt,
        generationDate:generationDate,
        generationStatus:"Complete",     // When we make this async this initial insert will be "Pending" and it will be updated on the completion.
        imgUrl:blobSaveData.downloadUrl
    });

    // return the blob storage link and prompt to the client
    const res = {
        imgUrl: blobSaveData.downloadUrl
    }
    return Response.json(res)
}