// import { useContext } from "react"
// import { AuthContext } from "../context/AuthContext"
// import { Navigate, Route } from "react-router-dom"

// const PrivateRouteUsers = ({element}) => {
//     const {isAuthenticated} = useContext(AuthContext)
//     if(isAuthenticated) {
//         switch (isAuthenticated) {
//             case 'SUPERVISOR':
//             case 'PERSONNEL':
//             case 'GUEST':
//                 return <Route element={element} />  
//             default:
//                 return <Navigate to="/login" />
//         }
//     }
// }
// export default PrivateRouteUsers;