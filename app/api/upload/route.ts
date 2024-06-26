import { v4 as uuidv4 } from 'uuid';
import { storeImageBlob } from '../(utils)/(blobstore)/blobstoreAWS';
import { saveImage } from '../(utils)/(db)/data';
import { ApiImage } from '../apitypes';
import { addImageToLibrary } from '../(utils)/(db)/data';
import { apiRouteAuthCheck } from '@backend/(utils)/(jwt)/tokenUtils';

const processFile = async (imageFile: File, userId:number) => {
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const image: Blob = new Blob([new Uint8Array(imageBuffer)], { type: 'image/bmp' });

    // Save image to BlobStore
    const id = uuidv4();
    var fileExt = imageFile.name.split('.').pop();
    const filename = `${id}.${fileExt}`;
    const blobSaveData = await storeImageBlob(filename, image, "Uploaded");

    const imgInfo: ApiImage = {
        id: undefined,
        imageOrigin: "Uploaded",
        createdById: userId,
        prompt: "",
        createDate: new Date(Date.now()),
        // When we make this async this initial insert will be "Pending" and it will be updated on the completion.
        createStatus: blobSaveData.saveStatus,
        imgUrl: blobSaveData.downloadUrl,
        path: blobSaveData.path
    };

    // Save image record to db if the save to blobstore was successful
    if (blobSaveData.saveStatus == "Complete") {
        const id = await saveImage(imgInfo);
        imgInfo.id = id;

        if (imgInfo.id) {
            console.log("adding uploaded image to library");
            const updatedImage = await addImageToLibrary(imgInfo.id, userId);
            imgInfo.libraryId = updatedImage.libraryId;
        }
    }

    return imgInfo;
}

export async function POST(req: Request) {
    const authCheckResponse = apiRouteAuthCheck(req);
    if (!authCheckResponse.success) return Response.json({},{status:401});

    const formData = await req.formData();

    const imageFile = formData.get('file') as unknown as File | null;

    if (!imageFile) {
        console.log("returning error");
        return Response.json({ status: 400, success: false });
    }

    console.log(imageFile);

    const imgInfo: ApiImage = await processFile(imageFile, authCheckResponse.userId);
    console.log('done');

    return Response.json(imgInfo);
}
