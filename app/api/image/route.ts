import { v4 as uuidv4 } from 'uuid';
import { storeImageBlob, deleteImageBlob } from '../(utils)/(blobstore)/blobstoreAWS';
import { addImageToLibrary, deleteImage as deleteImageDB, getImage, saveImage } from '../(utils)/(db)/data';
import { makeImageDalleSync } from './dalle';
import { ApiImage } from '../apitypes';
import { apiRouteAuthCheck } from '@backend/(utils)/(jwt)/tokenUtils';

// POST = Generate an image (creates the image in blobstore and db, but does NOT add to library - that is a separate user action)
// DELETE = delete an image (hard delete: removes from library if it's in one, and then from db and from blobstore)
// PATCH - add to the library

export async function PATCH(req: Request) {
    const authCheckResponse = apiRouteAuthCheck(req);
    if (!authCheckResponse.success) return Response.json({}, { status: 401 });

    const { action, imgId } = await req.json();

    if (action == "AddToLibrary") {
        try {
            const imgInfo = await addImageToLibrary(imgId, authCheckResponse.userId);
            return Response.json(imgInfo);
        } catch (e) {
            console.log("error in adding to library");
            console.log(e);
            return Response.json({},{ status: 404 })
        }
    }
    return Response.json({},{ status: 400 });
}
export async function DELETE(req: Request) {
    const authCheckResponse = apiRouteAuthCheck(req);
    if (!authCheckResponse.success) return Response.json({}, { status: 401 });

    const body = await req.json();

    let success: boolean = false;
    if (body && body.imgId) {
        const imageId = parseInt(body.imgId);

        try {
            const imageInfo: ApiImage | null = await getImage(imageId);
            if (imageInfo) {
                await deleteImageDB(imageId);
                if (imageInfo.path) await deleteImageBlob(imageInfo.path);
                success = true;
            }
        }
        catch (e) {
            console.log(e);
        }
    }
    return Response.json({},{ status: success ? 200 : 400 });
}

export async function POST(req: Request) {
    const authCheckResponse = apiRouteAuthCheck(req);
    if (!authCheckResponse.success) return Response.json({}, { status: 401 });

    const { prompt, aspectRatio } = await req.json();
    const createDate: Date = new Date(Date.now());

    try {
        const image: Blob = await makeImageDalleSync(prompt, aspectRatio);

        // save the returned image to blob storage 
        const id = uuidv4();
        const filename = `${id}.bmp`;
        const blobSaveData = await storeImageBlob(filename, image, "Generated");

        // save the metadata to db
        const imgInfo: ApiImage = {
            id: undefined,
            imageOrigin: "Generated",
            createdById: authCheckResponse.userId,
            prompt: prompt,
            createDate: createDate,
            // When we make this async this initial insert will be "Pending" and it will be updated on the completion.
            createStatus: blobSaveData.saveStatus,
            imgUrl: blobSaveData.downloadUrl,
            path: blobSaveData.path
        };

        // Save image record to db if the save to blobstore was successful
        if (blobSaveData.saveStatus == "Complete") {
            const id = await saveImage(imgInfo);
            imgInfo.id = id;
        }

        // return the blob storage link and prompt to the client
        return Response.json(imgInfo);
    }
    catch (e) {
        console.log("Image generation failed.");
        console.log(e);

        return Response.json({
            imageOrigin: "Generated",
            createdById: authCheckResponse.userId,
            prompt: prompt,
            createDate: createDate,
            // When we make this async this initial insert will be "Pending" and it will be updated on the completion.
            createStatus: "Failed",
            imgUrl: ""
        });
    }
}