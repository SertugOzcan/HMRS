import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const SupervisorPageAdvanceAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const SupervisorPageAdvanceAPIContextProvider = ({children}) => {

    const [advanceRequests, setAdvanceRequests] = useState([]);
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
                const response = await axios.get(`http://localhost:80/advance/get-all-requests/${isAuthenticated.token}`)
                console.log("ADVANCEREQUESTS-DATA: ", response.data)
                setAdvanceRequests(response.data.reverse());
            } catch (error) {
                console.error("Error while fetching the advance requests data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getRequests();
    }, []);

    const handleAdvanceDecision = async (requestId, decision) => {
        setIsLoading(true);
        const payload = {
            "token": isAuthenticated.token,
            "requestId": requestId,
            "decision": decision
        };
        try {
            const response = await axios.patch("http://localhost:80/advance/update-request", payload)
            if (response.status === 200) {
                window.location.reload(true);
            }    
        } catch (error) {
            console.log("Error on updating advance update request! ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <SupervisorPageAdvanceAPIContext.Provider value={{advanceRequests, handleAdvanceDecision}}>
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
        </SupervisorPageAdvanceAPIContext.Provider>
    )

}