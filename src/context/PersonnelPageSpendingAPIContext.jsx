import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const PersonnelPageSpendingAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const PersonnelPageSpendingAPIContextProvider = ({children}) => {

    const [spendingRequests, setSpendingRequests] = useState([]);
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
                const response = await axios.get(`http://34.75.226.10:80/spending/get-all-my-requests/${isAuthenticated.token}`)
                // console.log("SPENDINGREQUESTS-DATA: ", response.data)
                setSpendingRequests(response.data.reverse());
            } catch (error) {
                console.error("Error while fetching the spending requests data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getRequests();
    }, []);

    const handleSubmit = async (newRequest, spendingAttachments) => {
        setIsLoading(true);
        let attachmentUrls = [];
        for (const attachment of spendingAttachments) {
            const file = attachment;
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "epd6rg4j");
            try {
              const response = await axios.post("https://api.cloudinary.com/v1_1/dhwpj4ze4/upload", formData);
              attachmentUrls.push(response.data.url);
            } catch (error) {
              console.error("Error while uploading image for creating spending request:", error);
            }
        }

        const payload = {
            token: isAuthenticated.token,
            reason: newRequest.reason,
            description: newRequest.description,
            amount: newRequest.amount,
            currency: newRequest.currency,
            spendingDate: newRequest.spendingDate,
            attachmentUrls: attachmentUrls,
        };

        try {
            const response = await axios.post("http://34.75.226.10:80/spending/create-request", payload);
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
        // console.log("Hazırlanan cancel spending payload:", payload);
        try {
            const response = await axios.patch("http://34.75.226.10:80/spending/cancel-request", payload)
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
        <PersonnelPageSpendingAPIContext.Provider value={{spendingRequests, handleSubmit, handleCancelRequest}}>
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