import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const PrivateRouteAdmin = ({element}) => {
    const {isAuthenticated} = useContext(AuthContext)
    if(isAuthenticated==="ADMIN"){
        return <Navigate to={element}/>
    }
    return <Navigate to="/admin-login"/>
}
export default PrivateRouteAdmin;