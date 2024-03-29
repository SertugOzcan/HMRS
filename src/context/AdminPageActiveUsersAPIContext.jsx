/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const AdminPageActiveUsersAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const AdminPageActiveUsersAPIContextProvider = ({children}) => {
    const [activeUsers, setActiveUsers] = useState([]);
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
                const response = await axios.get('http://34.75.226.10:80/auth/get-all-active')
                // console.log("GETALLACTIVE: ", response);
                setActiveUsers(response.data)
            } catch (error) {
                console.error("Error while fetching the get all active data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getRequests();
    }, []);

    return (
        <AdminPageActiveUsersAPIContext.Provider value={{activeUsers}}>
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
        </AdminPageActiveUsersAPIContext.Provider>
    )
}










