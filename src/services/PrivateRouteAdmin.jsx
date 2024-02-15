import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const PrivateRouteAdmin = ({element}) => {
    const {isAuthenticated} = useContext(AuthContext)

    return isAuthenticated ? element : <Navigate to="/admin-login"/>
}

export default PrivateRouteAdmin;