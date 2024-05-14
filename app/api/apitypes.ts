// These types define structures that are used to pass data into and out of the api
// The API also in some places directly uses the prisma client defined types

import { AdType } from "@prisma/client";

export type ImageOrigin = "Generated" | "Uploaded";
export type ImageGenerationStatus = "Pending"|"Complete"|"Failed";
export type ImageAspectRatio = "portrait" | "landscape"|"square";
export type ImageStyle = "cartoon" | "sketch" | "photo";



export type ApiImage = {
    id: number|undefined,
    imageOrigin: ImageOrigin,
    createdById: number,
    prompt: string|null,
    createDate: Date|null,
    createStatus: ImageGenerationStatus,
    imgUrl: string,
    libraryId?: number|null,
    path: string
};

export type ApiTenant = {
    id: number|undefined,
    name: string,
    hostname: string
}

// this joins the info in the user and the related identity...
export type ApiUser = {
    id: number|undefined,
    name: string|undefined,
    email: string | undefined,
    avatarImageUrl: string|undefined
}

export type ApiAuthSimpleCredentials= {
    username: string,
    password: string
}

export type ApiAssetType = "Static Ad" | "Dynamic Ad" | "Background" | "Object";


export type ApiAdSet = {
    id: number,
    type:AdType,
    name:string,
    ads:[number],       // array of ad ids
}

export type ApiLibrarySearchResults = {
    images: ApiImage[],
    ads: ApiAdSet[]
}