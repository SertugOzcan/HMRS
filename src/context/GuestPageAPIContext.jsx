import { createContext, useState } from "react"

export const GuestPageAPIContext = createContext();

export const GuestPageAPIContextProvider = ({children}) =>{
    const [CompanyData, setCompanyData] = useState({});

    //burada axios metodu


return (
    <GuestPageAPIContext.Provider value={{CompanyData}}>
        {children}
    </GuestPageAPIContext.Provider>
)


}