import { createContext, useEffect, useState } from "react";
import AuthService from "../services/AuthService";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedUser = AuthService.getCurrentUser();
        return storedUser;
    });

    useEffect(() => {
        const storedUser = AuthService.getCurrentUser();
        setIsAuthenticated(storedUser);
    }, []);

    const login = async (identity,password) => {
        try {
            const resData = await AuthService.loginService(identity,password)
            console.log(resData);
            if(resData.role){
                setIsAuthenticated(AuthService.getCurrentUser())
            }
            return true
        } catch (error) {
            setIsAuthenticated(false)
            throw new Error(error)
        }
    }
    const logout = () => {
        AuthService.logoutService()
        setIsAuthenticated(false)
    }

    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}