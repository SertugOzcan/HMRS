import React, { useState, useEffect } from 'react';
import "./AdminPage.css";

const AdminPage = () => {
  const [managerRequests, setManagerRequests] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Simüle edilmiş veri
  useEffect(() => {
    // API'den veya veritabanından yönetici başvurularını getir
    const fakeManagerRequests = [
      { id: 1, name: 'John Doe', email: 'john@example.com', companyName: 'ABC Inc.', position: 'Manager' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', companyName: 'XYZ Corp.', position: 'Manager' }
    ];
    setManagerRequests(fakeManagerRequests);

    // Kayıtlı kullanıcıları getir
    const fakeRegisteredUsers = [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' }
    ];
    setRegisteredUsers(fakeRegisteredUsers);
  }, []);

  const handleApprove = (id) => {
    // Onay işlemi gerçekleştir
    console.log(`Approving manager request with ID: ${id}`);
  };

  return (
    <div className="admin-container">
      <div className="registered-users-container">
        <h2>Registered Users</h2>
        <div className="registered-users">
          {registeredUsers.map((user) => (
            <div key={user.id} className="registered-user">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="manager-requests-container">
        <h2>Manager Requests</h2>
        <div className="manager-requests">
          {managerRequests.map((request) => (
            <div key={request.id} className="manager-request">
              <p>Name: {request.name}</p>
              <p>Email: {request.email}</p>
              <p>Company: {request.companyName}</p>
              <p>Position: {request.position}</p>
              <button onClick={() => handleApprove(request.id)}>Approve</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
