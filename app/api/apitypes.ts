export type ImageOrigin = "Generated" | "Uploaded";
export type ImageGenerationStatus = "Pending"|"Complete"|"Failed";
export type ImageAspectRatio = "portrait" | "landscape"|"square";
export type ImageStyle = "cartoon" | "sketch" | "photo";

export type ApiImage = {
    id: number|undefined,
    imageOrigin: ImageOrigin,
    createdById: number,
    prompt: string,
    createDate: Date,
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