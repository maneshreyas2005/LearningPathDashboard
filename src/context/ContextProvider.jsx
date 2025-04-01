import React, {createContext, useState} from "react"; 


export const Context  = createContext();
    
export default function ContextProvider({ children}) { 
const [data, setData] = useState(null);

        
    return ( 
        <div> 
            <Context.Provider value={data}>
                {children}
            </Context.Provider> 
        </div> 
    );
}
