import { useContext } from "react";
import "./RegisteredUsers.css";
import { AdminPageActiveUsersAPIContext } from "../../../context/AdminPageActiveUsersAPIContext";

const RegisteredUsers = () => {
  const { activeUsers } = useContext(AdminPageActiveUsersAPIContext);
  return (
    <div className="registered-users-container">
      <h2>Active Users</h2>

      <div className="registered-users">
        {activeUsers.map((user) => (
          <div key={user.email} className="card_active_users">
            <div className="registered-user">
              <p>
                <b>Email:</b> {user.email}
              </p><br />
              <p>
                <b>Phone:</b> {user.phone}
              </p><br />
              <p>
                <b>Password:</b> {user.password}
              </p><br />
              <p>
                <b>Role:</b> {user.role}
              </p><br />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredUsers;
