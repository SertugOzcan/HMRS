
import "./AdminPage.css";
import SupervisorRequestList from '../components/SupervisorRequestList/SupervisorRequestList';
import { useContext } from "react";
import { AdminPageAPIContext } from "../context/AdminPageAPIContext";

const AdminPage = () => {

  const {activeUsers} = useContext(AdminPageAPIContext);

  return (
    <div className="admin-container">
      <div className="registered-users-container">
        <h2>Registered Active Users</h2>
        <div className="registered-users">
          {activeUsers.map((user) => (
            <div key={user.id} className="registered-user">
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Password: {user.password}</p>
              <p>Role: {user.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="manager-requests-container">
        <h2>Manager Requests</h2>
        <SupervisorRequestList />
      </div>
    </div>
  );
}

export default AdminPage;
