import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"
import axios from "axios";

export const SupervisorPageAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const SupervisorPageAPIContextProvider = ({children}) => {
    const [companyData, setCompanyData] = useState({});
    // const [personnelData, setPersonnelData] = useState({});
    const [companyStatus,setCompanyStatus] = useState('PENDING');
    const {isAuthenticated} = useContext(AuthContext);

    const getSupervisorPageData = () => {
        const getRequests = async () => {
            try {
                console.log(isAuthenticated.token);
                const response = await axios.get(`http://localhost:9095/api/v1/company/findbysupervizortoken/${isAuthenticated.token}`)
                // console.log("RESPONSE: ", response);
                // console.log("RESPONSE.DATA: ", response.data);
                setCompanyData(response.data);
                if(response.data.companyStatus === "ACTIVE"){
                    setCompanyStatus("ACTIVE");
                }
            } catch (error) {
                console.error("Error while fetching the company data:", error);
            }
        };
        getRequests();
    }


    useEffect(() => {
        getSupervisorPageData();
    }, []);

    return (
        <SupervisorPageAPIContext.Provider value={{companyData, setCompanyData, companyStatus, setCompanyStatus, getSupervisorPageData}}>
            {children}
        </SupervisorPageAPIContext.Provider>
    )

}
