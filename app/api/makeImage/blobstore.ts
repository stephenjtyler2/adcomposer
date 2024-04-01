import {put} from '@vercel/blob';

type BlobSaveData = {
    saveStatus: "Complete" | "Failed",
    contentDisposition: string,
    downloadUrl: string,
    pathname: string,
    url: string
}

export async function storeImage(id:String, image:Blob) : Promise<BlobSaveData> {
    const blob = await put(`images/generated/${id}.png`, image, {access:"public"});
    blob.contentDisposition
    return {
        saveStatus: "Complete",
        ...blob
    };
}
