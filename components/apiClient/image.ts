import { ImageAspectRatio } from "@backend/apitypes";
import { handleUnauthorized } from "./utils/network";
import { AuthContextType } from "../contexts/AuthContext";

export async function generateImage(authContext: AuthContextType, prompt: string, aspectRatio: ImageAspectRatio): Promise<Response> {
    return fetch('/api/image', {
        method: "POST",
        body: JSON.stringify({ prompt: prompt, aspectRatio: aspectRatio })
    })
    .then(response=>handleUnauthorized(response,authContext));

}

export async function addImageToLibrary(authContext: AuthContextType, imgId: number): Promise<Response> {
    return fetch('/api/image', {
        method: "PATCH",
        body: JSON.stringify({
            action: "AddToLibrary",
            imgId: imgId,
        })
    })
    .then(response=>handleUnauthorized(response,authContext))
}

// removes the image entirely from the backend - unhooks from the library its in and deletes from db and blobstore
export async function deleteImage(authContext: AuthContextType, imgId: number): Promise<boolean> {
    return fetch('/api/image', {
        method: "DELETE",
        body: JSON.stringify({
            imgId: imgId,
        })
    })
    .then(response=>handleUnauthorized(response,authContext))
    .then(response=> (response && response.ok));
}


