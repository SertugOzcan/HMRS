import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const PersonnelPageDayOffAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const PersonnelPageDayOffAPIContextProvider = ({children}) => {

    const [dayOffRequests, setDayOffRequests] = useState([])
    // const [pendingDayOffRequests, setPendingDayOffRequests] = useState([]);
    // const [notPendingDayOffRequests, setNotPendingDayOffRequests] = useState([]);
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
                setDayOffRequests(response.data);
                // setPendingDayOffRequests(response.data.filter(request => request.requestStatus === "PENDING"))
                // setNotPendingDayOffRequests(response.data.filter(request => request.requestStatus !== "PENDING"));
            } catch (error) {
                console.error("Error while fetching the dayoff requests data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getRequests();
    }, []);

    const handleSubmit = async (newRequest) => {
        setIsLoading(true);
        const payload = {...newRequest, token: isAuthenticated.token}
        console.log("Hazırlanan new dayoff payload:", payload);
        try {
            const response = await axios.post("http://localhost:9089/api/v1/day-off/create-request", payload)
            if (response.status === 200) {
                window.location.reload(true);
            }    
        } catch (error) {
            console.log("Error on creating new day off request! ", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCancelRequest = async (requestId) => {
        setIsLoading(true);
        const payload = {
            "token": isAuthenticated.token,
            "requestId": requestId
        }
        console.log("Hazırlanan cancel dayoff payload:", payload);
        try {
            const response = await axios.patch("http://localhost:9089/api/v1/day-off/cancel-request", payload)
            if (response.status === 200) {
                window.location.reload(true);
            }    
        } catch (error) {
            console.log("Error on cancelling day off request! ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <PersonnelPageDayOffAPIContext.Provider value={{dayOffRequests, handleSubmit, handleCancelRequest}}>
            {isLoading ? (
                <h1 className="loading-h1-tags">Loading...</h1>
            ) : (
                children
            )}
        </PersonnelPageDayOffAPIContext.Provider>
    )

}