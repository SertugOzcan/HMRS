import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AdminPageAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const AdminPageAPIContextProvider = ({children}) => {
    const [supervisorRequests, setSupervisorRequests] = useState([]);
    const [activeUsers, setActiveUsers] = useState([]);


    const getAdminPageData = () => {
        const getRequests = async () => {
            try {
                const managerRequestsResponse = await axios.get('http://localhost:9093/api/v1/admin/getallregisteredsupervisors')
                setSupervisorRequests(managerRequestsResponse.data);
            
                const registeredUsersResponse = await axios.get('http://localhost:9090/api/v1/auth/get-all-active')
                setActiveUsers(registeredUsersResponse.data);
            } catch (error) {
                console.log('Error while fetching the data');   
            }
        };
        getRequests();
    }

    useEffect(() => {
        getAdminPageData();
    }, []);


    const handleSupervisorRequest = (authId, decision) => {
        const postRequest = async () => {
            const payload = {
                "token": "token",
                "supervisorAuthId": authId,
                "decision": decision.toString() 
            };
            try {
              const response = await axios.post("http://localhost:9093/api/v1/admin/handle-supervisor-registration", payload)
              console.log(response);
              getAdminPageData();
            } catch (error) {
              console.log(error)
            }
        }
        postRequest();
    }

    return (
        <AdminPageAPIContext.Provider value={{supervisorRequests, activeUsers, getAdminPageData, handleSupervisorRequest}}>
            {children}
        </AdminPageAPIContext.Provider>
    )
}










