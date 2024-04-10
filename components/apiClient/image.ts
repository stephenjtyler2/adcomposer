import { ImageAspectRatio, ApiImage } from "@backend/apitypes";

export async function generateImage (prompt:string, aspectRatio: ImageAspectRatio) {
    return fetch ('/api/image', {
        method: "POST",
        body: JSON.stringify ({prompt: prompt, aspectRatio: aspectRatio})
    })
}

export async function addImageToLibrary (imgId: number) {
    return fetch ('/api/image', {
        method: "PATCH",
        body: JSON.stringify ({
            action: "AddToLibrary",
            imgId: imgId,
        })
    })
}

// removes the image entirely from the backend - unhooks from the library its in and deletes from db and blobstore
export async function deleteImage (imgId:number) : Promise<boolean> {
    const response = await fetch ('/api/image', {
        method: "DELETE",
        body: JSON.stringify ({
            imgId: imgId,
        })
    })
    return (response && response.ok);
}