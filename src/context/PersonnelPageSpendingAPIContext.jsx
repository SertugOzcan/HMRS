import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const PersonnelPageSpendingAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const PersonnelPageSpendingAPIContextProvider = ({children}) => {

    const [pendingSpendingRequests, setPendingSpendingRequests] = useState([]);
    const [notPendingSpendingRequests, setNotPendingSpendingRequests] = useState([]);
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
                const response = await axios.get(`http://localhost:80/spending/get-all-my-requests/${isAuthenticated.token}`)
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

    const handleSubmit = async (newRequest, spendingAttachments) => {
        setIsLoading(true);
        const formData = new FormData();
        for (const key in newRequest) {
            formData.append(key, newRequest[key]);
        }
        spendingAttachments.forEach((file, index) => {
            formData.append(`attachments[${index}]`, file);
        });
        formData.append("token", isAuthenticated.token);
        console.log("HAZIRLANAN NEW SPENDING FORM DATA: ", formData);
        try {
            const response = await axios.post("http://localhost:80/spending/create-request", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
            });
            if (response.status === 200) {
                window.location.reload(true);
            }    
        } catch (error) {
            console.log("Error on creating new spending request! ", error);
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
        console.log("Hazırlanan cancel spending payload:", payload);
        try {
            const response = await axios.patch("http://localhost:80/spending/cancel-request", payload)
            if (response.status === 200) {
                window.location.reload(true);
            }    
        } catch (error) {
            console.log("Error on cancelling spending request! ", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <PersonnelPageSpendingAPIContext.Provider value={{pendingSpendingRequests, notPendingSpendingRequests, handleSubmit, handleCancelRequest}}>
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
        </PersonnelPageSpendingAPIContext.Provider>
    )

}