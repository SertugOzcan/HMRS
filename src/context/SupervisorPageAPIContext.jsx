import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"
import axios from "axios";

export const SupervisorPageAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const SupervisorPageAPIContextProvider = ({children}) => {
    const [companyData, setCompanyData] = useState({});
    const [companyStatus,setCompanyStatus] = useState('PENDING');
    const [companyPersonnel, setCompanyPersonnel] = useState([]);
    const {isAuthenticated} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:9095/api/v1/company/findbysupervizortoken/${isAuthenticated.token}`)
                setCompanyData(response.data);
                if(response.data.companyStatus === "ACTIVE"){
                    setCompanyStatus("ACTIVE");
                    const response2 = await axios.get(`http://localhost:9091/api/v1/personnel/get-all-by-company/${isAuthenticated.token}`)
                    setCompanyPersonnel(response2.data);
                }
            } catch (error) {
                console.error("Error while fetching the company data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getRequests();
    }, []);

    return (
        <SupervisorPageAPIContext.Provider value={{companyData, companyStatus, companyPersonnel}}>
            {isLoading ? (
                <h1>Loading...</h1>
            ) : (
                children
            )}
        </SupervisorPageAPIContext.Provider>
    )

}
