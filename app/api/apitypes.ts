export type ImageOrigin = "Generated" | "Uploaded";
export type ImageGenerationStatus = "Pending"|"Complete"|"Failed";
export type ImageAspectRatio = "portrait" | "landscape"|"square";
export type ImageStyle = "cartoon" | "sketch" | "photo";

export type ImageInfo = {
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