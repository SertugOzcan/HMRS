/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const AdminPagePendingSupervisorsAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const AdminPagePendingSupervisorsAPIContextProvider = ({children}) => {
    const [pendingSupervisors, setPendingSupervisors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated.role!=="ADMIN"){
            return navigate("/login")
        }
        const getRequests = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://localhost:9093/api/v1/admin/get-all-pending-supervisors')
                console.log("GETALLPENDINGSUPERVISORS: ", response);
                setPendingSupervisors(response.data)
            } catch (error) {
                console.error("Error while fetching the get all pending supervisors data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getRequests();
    }, []);

    const handleSupervisorRequest = async (authId, decision) => {
        setIsLoading(true);
        const payload = {
            "token": "token",
            "supervisorAuthId": authId,
            "decision": decision.toString() 
        };
        try {
            const response = await axios.post("http://localhost:9093/api/v1/admin/handle-supervisor-registration", payload)
            if (response.status === 200) {
                setPendingSupervisors(prevRequest => 
                    prevRequest.filter(request => request.authId !== authId)
                );
                // window.location.reload(true);
            }    
        } catch (error) {
            console.log("Error while handle supervisor request! ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AdminPagePendingSupervisorsAPIContext.Provider value={{pendingSupervisors, handleSupervisorRequest}}>
            {isLoading ? (
                <h1 className="loading-h1-tags">Loading...</h1>
            ) : (
                children
            )}
        </AdminPagePendingSupervisorsAPIContext.Provider>
    )
}










