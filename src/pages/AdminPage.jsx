import React, { useState, useEffect } from 'react';
import "./AdminPage.css";
import axios from 'axios';

const AdminPage = () => {
  const [managerRequests, setManagerRequests] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  // const fakeManagerRequests = [
  //   { id: 1, name: 'John Doe', email: 'john@example.com', companyName: 'ABC Inc.', position: 'Manager', status: 'pending' },
  //   { id: 2, name: 'Jane Smith', email: 'jane@example.com', companyName: 'XYZ Corp.', position: 'Manager', status: 'pending' }
  // ];
  // const fakeRegisteredUsers = [
  //   { id: 1, name: 'Alice', email: 'alice@example.com' },
  //   { id: 2, name: 'Bob', email: 'bob@example.com' }
  // ];
  // const [updatedArray,setUpdatedArray] = useState(fakeManagerRequests)
  // Simüle edilmiş veri
  
  

  const handleApprove = (id) => {
    // Onay işlemi gerçekleştir
    // const updatedArray = fakeManagerRequests.map(item => {
    //   if (item.id === id) {
    //     // İstenilen objenin alanını güncelle
    //     return { ...item, status: 'approved' };
    //   }
    //   return item;
    // });
    setManagerRequests(updatedArray)
    console.log(updatedArray);
    console.log(`Approving manager request with ID: ${id}`);
  };
  const handleDecline = (id) => {
    // Red işlemi gerçekleştir
    
    console.log(`Declining manager request with ID: ${id}`);
  };

  useEffect(() => {
    const getData = async () =>{

      try {
        const managerRequestsResponse = await axios.get('http://localhost:9093/api/v1/admin/getallregisteredsupervisors')
        const managerRequestsData = managerRequestsResponse.data
        console.log(managerRequestsData);
        setManagerRequests(managerRequestsData);
        
        // Kayıtlı kullanıcıları getir
        const registeredUsersResponse = await axios.get('http://localhost:9090/api/v1/auth/getallregistered')
        const userDatas = registeredUsersResponse.data
        console.log(userDatas);
        setRegisteredUsers(userDatas);
      } catch (error) {
          console.log('Error while fetching the data');   
      }
    }
    // API'den veya veritabanından yönetici başvurularını getir
    getData();

  }, []);


  

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
        <div id="managerRequest" className="manager-requests">
          {managerRequests.map((request) => (
            <div key={request.id} className="manager-request">
              <p>Name: {request.name}</p>
              <p>Email: {request.email}</p>
              <p>Company: {request.companyName}</p>
              <p>Gender: {request.gender}</p>
              <button className='approve-btn' onClick={() => handleApprove(request.id)}>Approve</button>
              <button className='decline-btn' onClick={() => handleDecline(request.id)}>Decline</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
