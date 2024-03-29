import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const PersonnelPageDayOffAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const PersonnelPageDayOffAPIContextProvider = ({children}) => {

    const [dayOffRequests, setDayOffRequests] = useState([])
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
                const response = await axios.get(`http://34.75.226.10:80/day-off/get-all-my-requests/${isAuthenticated.token}`)
                // console.log("DAYOFFREQUESTS-DATA: ", response.data)
                setDayOffRequests(response.data.reverse());
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
        // console.log("Hazırlanan new dayoff payload:", payload);
        try {
            const response = await axios.post("http://34.75.226.10:80/day-off/create-request", payload)
            if (response.status === 200) {
                window.location.reload(true);
            }    
        } catch (error) {
            console.log("Error on creating new day off request! ", error);
            if(error.response.data.code === 5007) {
                alert("You already have pending day off request!");
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
        // console.log("Hazırlanan cancel dayoff payload:", payload);
        try {
            const response = await axios.patch("http://34.75.226.10:80/day-off/cancel-request", payload)
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
        </PersonnelPageDayOffAPIContext.Provider>
    )

}