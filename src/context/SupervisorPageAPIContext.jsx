import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SupervisorPageAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const SupervisorPageAPIContextProvider = ({children}) => {
    const [companyData, setCompanyData] = useState({});
    const [companyStatus,setCompanyStatus] = useState('PENDING');
    const [companyPersonnel, setCompanyPersonnel] = useState([]);
    const {isAuthenticated} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated.role!=="SUPERVISOR"){
            return navigate("/login")
        }
        setIsLoading(true);
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
                <h1 className="loading-h1-tags">Loading...</h1>
            ) : (
                children
            )}
        </SupervisorPageAPIContext.Provider>
    )

}
