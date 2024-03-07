import { createContext, useState } from "react";

export const SidebarCheckForSupervisorContext = createContext();

export const SidebarCheckForSupervisorContextProvider = ({children}) => {

    const [showSidebar, setShowSidebar] = useState("");

    return (
        <SidebarCheckForSupervisorContext.Provider value={{showSidebar, setShowSidebar}}>
            {children}
        </SidebarCheckForSupervisorContext.Provider>
    )
}