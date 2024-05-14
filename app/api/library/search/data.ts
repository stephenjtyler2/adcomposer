import { ApiAssetType, ApiImage, ApiLibrarySearchResults } from '@backend/apitypes';
import { ImageType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getImageResults = async (assetTypeFilters: ApiAssetType[], searchString: string) : Promise<ApiImage[]> => {
    console.log(`%${searchString}%`);

    const words = searchString.trim().split(" ");
    let searchArg ="";
    words.map(w=> {
        const wt = w.trim();
        if (wt.length>0) {
            searchArg = 
                searchArg + 
                (searchArg.length>0 ? " | " : "") 
                + w
                + ":*"; // include partial - without this "Ireland" as a search term would not match "Ireland." in the searched text
        }
    })
    // console.log(searchArg);

    const imageTypes:ImageType[] =[];
    if (assetTypeFilters.includes("Background")) imageTypes.push("Background");
    if (assetTypeFilters.includes("Object")) imageTypes.push("Object");
    

    const images = await prisma.image.findMany({
        where: {
            imageType: {
                in: imageTypes
            },
            prompt: {
                search: searchArg
            },
        }
    })

    // console.log(images);
    return images;
}


export async function librarySearch(tenantId: number, assetTypeFilters: ApiAssetType[], searchString: string ) : Promise<ApiLibrarySearchResults> {
    const results: ApiLibrarySearchResults = {images:[],ads:[]};

    const library = await prisma.library.findUnique({
        where: {
            tenantId: tenantId
        }
    });

    if (assetTypeFilters.includes("Background")|| assetTypeFilters.includes("Object")) {
        const imageResults : ApiImage[] = await getImageResults(assetTypeFilters, searchString);
        results.images.push(...imageResults);
    }

    //if (assetTypeFilters.includes("Dynamic Ad")|| assetTypeFilters.includes("Static Ad")) addAdSetResults(results);    
    
    return results;

}