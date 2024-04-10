// providers.js (app directory)
'use client'
import { createContext,useState, useEffect} from 'react';
import { getTenant } from './apiClient/tenant';

export type AppContextType = {
    tenantId: number
    tenantName: string
}
export const AppContext = createContext({});

// This component reads and stores the tenant config and provides it via context to component hierarcy that is wraps.
export default function ({children}: React.PropsWithChildren) {
    const [context, setContext] = useState<AppContextType>({tenantId:-1, tenantName: ""})

    useEffect(()=>{
        if (context.tenantId == -1) {
            getTenant()
            .then(tenant=> {
                if (tenant && tenant.id) {
                    console.log(tenant);
                    setContext({tenantId: tenant.id, tenantName:tenant.name})
                }
            })
            .catch(e => {
                console.log("caught exception in getTenant");
            });
        }
    },[context]);

    return (
        <AppContext.Provider value = {context}>
            {children}
        </AppContext.Provider>
    )
}