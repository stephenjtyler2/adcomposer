export async function POST(req: Request) {

    const {
        prompt: string,
    } = await req.json();

    // submit the prompt to dall-e


    // save the returned image to S3



    // return the S3 link and prompt to the client

    const res = {
        method: "POST",
        string: "hello"
    }
    return Response.json(res)
}