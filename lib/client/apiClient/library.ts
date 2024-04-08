import { ImageInfo } from "@backend/apitypes"

// user Id is used to look up the library for the users's tenant
export async function addImageToLibrary (imgInfo: ImageInfo, userId: number ) {
    return fetch ('/api/library', {
        method: "PUT",
        body: JSON.stringify ({
            imageInfo: imgInfo,
            userId: userId})
    })
}

