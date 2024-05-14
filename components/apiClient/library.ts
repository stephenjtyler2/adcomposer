import { ApiAssetType, ApiLibrarySearchResults } from "@backend/apitypes";
import { AuthContextType } from "../contexts/AuthContext";
import { handleUnauthorized } from "./utils/network";

export async function librarySearch(authContext: AuthContextType, assetTypeFilters: ApiAssetType[], searchString: string): Promise<ApiLibrarySearchResults | null> {

    return fetch('/api/library/search', {
        method: "POST",
        body: JSON.stringify ({
            assetTypeFilters: assetTypeFilters,
            searchString: searchString
        })
    })
        .then(response=>handleUnauthorized(response, authContext))
        .then(response => {
            if (response && response.ok) {
                return response.json();
            }
            else {
                console.log(response);
                return null;
            }
        })
        .catch(e => {
            console.log("APIClient: Error calling library search");
            console.log(e);
        })
}