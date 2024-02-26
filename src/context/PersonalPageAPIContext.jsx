/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const PersonnelPageAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const PersonnelPageAPIContextProvider = ({children}) => {
    const [personnel, setPersonnel] = useState([]);
    const [allPersonnel, setAllPersonnel] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated.role!=="PERSONNEL" && isAuthenticated.role!=="SUPERVISOR"){
            return navigate("/login")
        }
        setIsLoading(true);
        const getRequests = async () => {
            try {
                const response1 = await axios.get(`http://localhost:9091/api/v1/personnel/get/${isAuthenticated.token}`)
                console.log("PERSONEL RESPONSE DÖNEN: ", response1.data);
                setPersonnel(response1.data)
                // const response2 = await axios.get(`http://localhost:9091/api/v1/personnel/get-all`)
                // console.log("allpersonnel", response2.data);
                // setAllPersonnel(response2.data)
            } catch (error) {
                console.log('Error while fetching the data', error);   
            } finally {
                setIsLoading(false);
            }
        };
        getRequests();
    }, []);


    const handleEditMyInfo = async (newPersonnelInfo) => {
        // const payload = { ...newPersonnelInfo,
        //   token: isAuthenticated.token,
        // };
        // console.log("HAZIRLANAN PAYLOAD: ", payload);
        // try {
        //   const response = await axios.put("http://localhost:9091/api/v1/personnel/update", payload);
        //   console.log("PERSONEL EKLE DÖNEN RESPONSE: ", response);
        //   if (response.status === 200) {
        //     // setEmployees(prevEmployees => [...prevEmployees, response.data]);
        //     // setIsAddingEmployee(false);
        //     // window.location.reload(true);
        //   }
        // } catch (error) {
        //   console.error("Error adding employee:", error);
        // }
        const formData = new FormData();

        for (const key in newPersonnelInfo) {
          formData.append(key, newPersonnelInfo[key]);
        }
      
        formData.append("token", isAuthenticated.token);
      
        console.log("HAZIRLANAN FORM DATA: ", formData);
      
        try {
          const response = await axios.put("http://localhost:9091/api/v1/personnel/update", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
      
          console.log("PERSONEL EKLE DÖNEN RESPONSE: ", response);
      
          if (response.status === 200) {
            // setEmployees(prevEmployees => [...prevEmployees, response.data]);
            // setIsAddingEmployee(false);
            // window.location.reload(true);
          }
        } catch (error) {
          console.error("Error updating personnel:", error);
        }
    };


    return (
        <PersonnelPageAPIContext.Provider value={{personnel, handleEditMyInfo}}>
            {isLoading ? (
                <h1 className="loading-h1-tags">Loading...</h1>
            ) : (
                children
            )}
        </PersonnelPageAPIContext.Provider>
    )
}










