import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const SupervisorPageSpendingAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const SupervisorPageSpendingAPIContextProvider = ({children}) => {

    const [pendingSpendingRequests, setPendingSpendingRequests] = useState([]);
    const [notPendingSpendingRequests, setNotPendingSpendingRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated.role!=="SUPERVISOR"){
            return navigate("/login")
        }
        setIsLoading(true);
        const getRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:80/spending/get-all-requests/${isAuthenticated.token}`)
                console.log("SPENDINGREQUESTS-DATA: ", response.data)
                setPendingSpendingRequests(response.data.filter(request => request.requestStatus === "PENDING"))
                setNotPendingSpendingRequests(response.data.filter(request => request.requestStatus !== "PENDING"));
            } catch (error) {
                console.error("Error while fetching the spending requests data:", error);
            } finally {
                // console.log("PENDING OLAN DAYOFFLAR: ", pendingDayOffRequests);
                // console.log("PENDING OLMAYAN DAYOFFLAR: ", notPendingDayOffRequests);
                setIsLoading(false);
            }
        };
        getRequests();
    }, []);

    const handleSpendingDecision = async (requestId, decision) => {
        setIsLoading(true);
        const payload = {
            "token": isAuthenticated.token,
            "requestId": requestId,
            "decision": decision.toString()
        };
        try {
            const response = await axios.patch("http://localhost:80/spending/update-request", payload)
            if (response.status === 200) {
                const oldRequest = pendingSpendingRequests.find(request => request.id === requestId);
                console.log("OLD REQUEST ŞU: " , oldRequest);
                setPendingSpendingRequests(prevRequest => prevRequest.filter(request => request.id !== oldRequest.id))
                setNotPendingSpendingRequests(prevRequests => [oldRequest, ...prevRequests])
                // window.location.reload(true);
            }    
        } catch (error) {
            console.log("Error on updating spending update request! ", error);
        } finally {
            // console.log("PENDING OLAN DAYOFFLAR: ", pendingDayOffRequests);
            // console.log("PENDING OLMAYAN DAYOFFLAR: ", notPendingDayOffRequests);
            setIsLoading(false);
        }
    }

    return (
        <SupervisorPageSpendingAPIContext.Provider value={{pendingSpendingRequests, notPendingSpendingRequests, handleSpendingDecision}}>
            {isLoading ? (
                <div className="loader">
                <div className="box box0">
                  <div></div>
                </div>
                <div className="box box1">
                  <div></div>
                </div>
                <div className="box box2">
                  <div></div>
                </div>
                <div className="box box3">
                  <div></div>
                </div>
                <div className="box box4">
                  <div></div>
                </div>
                <div className="box box5">
                  <div></div>
                </div>
                <div className="box box6">
                  <div></div>
                </div>
                <div className="box box7">
                  <div></div>
                </div>
                <div className="ground">
                  <div></div>
                </div>
              </div>
            ) : (
                children
            )}
        </SupervisorPageSpendingAPIContext.Provider>
    )

}