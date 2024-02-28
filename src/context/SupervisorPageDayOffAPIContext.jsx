import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const SupervisorPageDayOffAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const SupervisorPageDayOffAPIContextProvider = ({children}) => {

    const [dayOffRequests, setDayOffRequests] = useState([])
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
                const response = await axios.get(`http://localhost:9089/api/v1/day-off/get-all-requests/${isAuthenticated.token}`)
                console.log("DAYOFFREQUESTS-DATA: ", response.data)
                setDayOffRequests(response.data.reverse());
            } catch (error) {
                console.error("Error while fetching the dayoff requests data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getRequests();
    }, []);

    const handleDayOffDecision = async (requestId, decision) => {
        setIsLoading(true);
        const payload = {
            "token": isAuthenticated.token,
            "requestId": requestId,
            "decision": decision
        };
        try {
            const response = await axios.patch("http://localhost:9089/api/v1/day-off/update-request", payload)
            if (response.status === 200) {
                window.location.reload(true);
            }    
        } catch (error) {
            console.log("Error on updating day off update request! ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SupervisorPageDayOffAPIContext.Provider value={{dayOffRequests, handleDayOffDecision}}>
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
        </SupervisorPageDayOffAPIContext.Provider>
    )

}