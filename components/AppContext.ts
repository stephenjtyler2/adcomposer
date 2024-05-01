import { createContext } from "react";

export type AppContextType = {
    tenantId: number
    tenantName: string
    // will probalby extend this with additional tenant specific app config related stuff later
}
export const AppContext = createContext<AppContextType>({tenantId:-1, tenantName: ""});