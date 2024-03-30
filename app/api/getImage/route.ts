export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const imgId = searchParams.get('imgId');

    // check if generation of imgID is still pending or complete

    const res = {
        imgId: `${imgId}`,
        generationStartTime: Date.now(),
        generationStatus: "PENDING",
        imgUrl: null
    };

    return Response.json(res)
}