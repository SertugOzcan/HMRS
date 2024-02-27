import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const PersonnelPageDayOffAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const PersonnelPageDayOffAPIContextProvider = ({children}) => {

    const [pendingDayOffRequests, setPendingDayOffRequests] = useState([]);
    const [notPendingDayOffRequests, setNotPendingDayOffRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated.role!=="PERSONNEL"){
            return navigate("/login")
        }
        setIsLoading(true);
        const getRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:9089/api/v1/day-off/get-all-my-requests/${isAuthenticated.token}`)
                console.log("DAYOFFREQUESTS-DATA: ", response.data)
                setPendingDayOffRequests(response.data.filter(request => request.requestStatus === "PENDING"))
                setNotPendingDayOffRequests(response.data.filter(request => request.requestStatus !== "PENDING"));
            } catch (error) {
                console.error("Error while fetching the dayoff requests data:", error);
            } finally {
                // console.log("PENDING OLAN DAYOFFLAR: ", pendingDayOffRequests);
                // console.log("PENDING OLMAYAN DAYOFFLAR: ", notPendingDayOffRequests);
                setIsLoading(false);
            }
        };
        getRequests();
    }, []);

    // const handleDayOffDecision = async (requestId, decision) => {
    //     setIsLoading(true);
    //     const payload = {
    //         "token": isAuthenticated.token,
    //         "requestId": requestId,
    //         "decision": decision.toString()
    //     };
    //     try {
    //         const response = await axios.patch("http://localhost:9089/api/v1/day-off/cancel-request", payload)
    //         if (response.status === 200) {
    //             const oldRequest = pendingDayOffRequests.find(request => request.id === requestId);
    //             console.log("OLD REQUEST ŞU: " , oldRequest);
    //             setPendingDayOffRequests(prevRequest => prevRequest.filter(request => request.id !== oldRequest.id))
    //             setNotPendingDayOffRequests(prevRequests => [oldRequest, ...prevRequests])
    //             // window.location.reload(true);
    //         }    
    //     } catch (error) {
    //         console.log("Error on updating day off update request! ", error);
    //     } finally {
    //         // console.log("PENDING OLAN DAYOFFLAR: ", pendingDayOffRequests);
    //         // console.log("PENDING OLMAYAN DAYOFFLAR: ", notPendingDayOffRequests);
    //         setIsLoading(false);
    //     }
    // }

    return (
        <PersonnelPageDayOffAPIContext.Provider value={{pendingDayOffRequests, notPendingDayOffRequests}}>
            {isLoading ? (
                <h1 className="loading-h1-tags">Loading...</h1>
            ) : (
                children
            )}
        </PersonnelPageDayOffAPIContext.Provider>
    )

}