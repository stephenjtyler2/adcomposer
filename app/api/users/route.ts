import { apiRouteAuthCheck } from '@backend/(utils)/(jwt)/tokenUtils';
import {getAllUsers} from './data';


// This is not used yet...
// export async function GET(req: Request) {
//     const authCheckResponse = apiRouteAuthCheck(req);
//     if (!authCheckResponse.success) return Response.json({},{status:401});

//     const {searchParams} = new URL(req.url);
//     const imgId = searchParams.get('imgId');

//     // check if generation of imgID is still pending or complete
//     const users = await getAllUsers();
    
//     const res = {
//         imgId: `${imgId}`,
//         dburl: process.env.POSTGRES_DATABASE,
//         users: users,
//         generationStartTime: Date.now(),
//         generationStatus: "PENDING",
//         imgUrl: null
//     };

//     return Response.json(res)
// }

