import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const PrivateRouteUsers = ({element}) => {
    const {isAuthenticated} = useContext(AuthContext)
    switch (isAuthenticated) {
        case 'SUPERVISOR':
            return <Navigate to= {element} /> 
        case 'PERSONNEL':
            return <Navigate to={element} />        
        default:
            return <Navigate to={element}/>
    }
}
export default PrivateRouteUsers;