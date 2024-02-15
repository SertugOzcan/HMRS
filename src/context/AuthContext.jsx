import { createContext, useState } from "react";
import AuthService from "../services/AuthService";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState('')

    const login = async (identity,password) => {

        try {
            const resData = await AuthService.loginService(identity,password)
            console.log(resData);
            if(resData.role){
                switch (resData.role) {
                    case 'ADMIN':
                        setIsAuthenticated('ADMIN')
                        return isAuthenticated;
                    case 'SUPERVISOR':
                        setIsAuthenticated('SUPERVISOR')
                        return isAuthenticated
                    case 'PERSONNEL':
                        setIsAuthenticated('PERSONNEL')
                        return isAuthenticated    
                    default:
                        setIsAuthenticated('GUEST')
                        return isAuthenticated    
                }
            }
        } catch (error) {
            setIsAuthenticated('')
            throw new Error(error)
        }
    }

    const logout = () => {
        AuthService.logoutService()
        setIsAuthenticated('')
    }

    return(
        <AuthContext.Provider value={{isAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}