import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const PrivateRouteUsers = ({element}) => {
    const {isAuthenticated} = useContext(AuthContext)

    return isAuthenticated ? element : <Navigate to="/login"/>
}

export default PrivateRouteUsers;