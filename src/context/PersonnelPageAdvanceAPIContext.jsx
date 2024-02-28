import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const PersonnelPageAdvanceAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const PersonnelPageAdvanceAPIContextProvider = ({children}) => {

    const [advanceRequests, setAdvanceRequests] = useState([]);
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
                const response = await axios.get(`http://localhost:9088/api/v1/advance/get-all-my-requests/${isAuthenticated.token}`)
                console.log("ADVANCEREQUESTS-DATA: ", response.data)
                setAdvanceRequests(response.data);
            } catch (error) {
                console.error("Error while fetching the advance requests data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getRequests();
    }, []);

    const handleSubmit = async (newRequest) => {
        setIsLoading(true);
        const payload = {...newRequest, token: isAuthenticated.token}
        console.log("Hazırlanan new advance payload:", payload);
        try {
            const response = await axios.post("http://localhost:9088/api/v1/advance/create-request", payload)
            if (response.status === 200) {
                window.location.reload(true);
            }    
        } catch (error) {
            console.log("Error on creating new advance request! ", error);
            if(error.response.data.code === 5007) {
                alert("You already have pending advance request!");
            }
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
        console.log("Hazırlanan cancel advance payload:", payload);
        try {
            const response = await axios.patch("http://localhost:9088/api/v1/advance/cancel-request", payload)
            if (response.status === 200) {
                window.location.reload(true);
            }    
        } catch (error) {
            console.log("Error on cancelling advance request! ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <PersonnelPageAdvanceAPIContext.Provider value={{advanceRequests, handleSubmit, handleCancelRequest}}>
            {isLoading ? (
                <h1 className="loading-h1-tags">Loading...</h1>
            ) : (
                children
            )}
        </PersonnelPageAdvanceAPIContext.Provider>
    )

}