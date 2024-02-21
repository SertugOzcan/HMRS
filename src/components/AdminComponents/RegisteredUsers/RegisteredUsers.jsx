import React from 'react'
import { useContext } from "react";
import { AdminPageAPIContext } from "../../../context/AdminPageAPIContext";
import './RegisteredUsers.css'   
         
const RegisteredUsers = () => {
    const {activeUsers} = useContext(AdminPageAPIContext);
  return (
    <div className="registered-users-container">
        <h2>Active Users</h2>
        <div className="registered-users">
          {activeUsers.map((user) => (
            <div key={user.email} className="registered-user">
              <p><b>Email:</b> {user.email}</p>
              <p><b>Phone:</b> {user.phone}</p>
              <p><b>Password:</b> {user.password}</p>
              <p><b>Role:</b> {user.role}</p>
            </div>
          ))}
        </div>
      </div>
  )
}

export default RegisteredUsers