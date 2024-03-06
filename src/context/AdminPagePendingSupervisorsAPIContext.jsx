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
                const response = await axios.get('http://localhost:80/admin/get-all-pending-supervisors')
                // console.log("GETALLPENDINGSUPERVISORS: ", response);
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
            const response = await axios.post("http://localhost:80/admin/handle-supervisor-registration", payload)
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
        </AdminPagePendingSupervisorsAPIContext.Provider>
    )
}










