/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const PersonnelPageAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const PersonnelPageAPIContextProvider = ({children}) => {
    const [personnel, setPersonnel] = useState([]);
    const [allPersonnel, setAllPersonnel] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated.role!=="PERSONNEL" && isAuthenticated.role!=="SUPERVISOR"){
            return navigate("/login")
        }
        setIsLoading(true);
        const getRequests = async () => {
            try {
                const response1 = await axios.get(`http://localhost:9091/api/v1/personnel/get/${isAuthenticated.token}`)
                console.log("PERSONEL RESPONSE DÖNEN: ", response1.data);
                setPersonnel(response1.data)
                // const response2 = await axios.get(`http://localhost:9091/api/v1/personnel/get-all`)
                // console.log("allpersonnel", response2.data);
                // setAllPersonnel(response2.data)
            } catch (error) {
                console.log('Error while fetching the data', error);   
            } finally {
                setIsLoading(false);
            }
        };
        getRequests();
    }, []);


    // const handleSupervisorRequest = async (authId, decision) => {
    //     setIsLoading(true);
    //     const payload = {
    //         "token": "token",
    //         "supervisorAuthId": authId,
    //         "decision": decision.toString() 
    //     };
    //     try {
    //         const response = await axios.post("http://localhost:9093/api/v1/admin/handle-supervisor-registration", payload)
    //         if (response.status === 200) {
    //             setSupervisorRequests(prevRequest => 
    //                 prevRequest.filter(request => request.authId !== authId)
    //             );
    //         }
    //         const updatedActiveUsers = await axios.get("http://localhost:9090/api/v1/auth/get-all-active")
    //         setActiveUsers(updatedActiveUsers.data)
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    return (
        <PersonnelPageAPIContext.Provider value={{personnel}}>
            {isLoading ? (
                <h1 className="loading-h1-tags">Loading...</h1>
            ) : (
                children
            )}
        </PersonnelPageAPIContext.Provider>
    )
}










