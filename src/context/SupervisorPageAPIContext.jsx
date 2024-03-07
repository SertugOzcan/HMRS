import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SupervisorPageAPIContext = createContext();

// eslint-disable-next-line react/prop-types
export const SupervisorPageAPIContextProvider = ({children}) => {
    const [companyData, setCompanyData] = useState({});
    const [companyStatus,setCompanyStatus] = useState('PENDING');
    const [companyPersonnel, setCompanyPersonnel] = useState([]);
    const [isAddingEmployee, setIsAddingEmployee] = useState(false); // Yeni satır
    // const [employees, setEmployees] = useState([]);   // aynı galiba...
    const {isAuthenticated} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated.role!=="SUPERVISOR"){
            return navigate("/login")
        }
        setIsLoading(true);
        const getRequests = async () => {
            try {
                const response = await axios.get(`http://34.75.226.10:80/company/findbysupervizortoken/${isAuthenticated.token}`)
                // console.log("COMPANY-DATASI: ", response.data)
                setCompanyData(response.data);
                if(response.data.companyStatus === "ACTIVE"){
                    setCompanyStatus("ACTIVE");
                    const response2 = await axios.get(`http://34.75.226.10:80/personnel/get-all-by-company/${isAuthenticated.token}`)
                    setCompanyPersonnel(response2.data);
                }
            } catch (error) {
                console.error("Error while fetching the company data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        getRequests();
    }, []);


    const handleAddEmployee = async (newEmployee) => {
        const selectedDepartment = companyData.departments.find(department => department.name === newEmployee.departmentId)
        // console.log("Selected-department: " , selectedDepartment);
        if(!selectedDepartment) {
            alert("Department not found!");
            return;
        }
        const payload = { ...newEmployee,
          companyId: companyData.id,
          departmentId: selectedDepartment.id,
          position: "Software Developer",
        };
        // console.log("HAZIRLANAN PAYLOAD: ", payload);
        try {
          const response = await axios.post("http://34.75.226.10:80/personnel/create", payload);
          // console.log("PERSONEL EKLE DÖNEN RESPONSE: ", response);
          if (response.status === 200) {
            // setEmployees(prevEmployees => [...prevEmployees, response.data]);
            setIsAddingEmployee(false);
            window.location.reload(true);
          }
        } catch (error) {
          console.error("Error adding employee:", error);
        }
    };

    return (
        <SupervisorPageAPIContext.Provider value={{companyData, companyStatus, companyPersonnel, handleAddEmployee, isAddingEmployee, setIsAddingEmployee}}>
            {isLoading ? (
                <div className="loader">
                <div className="box box0">
                  <div></div>
                </div>
                <div className="box box1">
                  <div></div>
                </div>
                <div className="box box2">
                  <div></div>
                </div>
                <div className="box box3">
                  <div></div>
                </div>
                <div className="box box4">
                  <div></div>
                </div>
                <div className="box box5">
                  <div></div>
                </div>
                <div className="box box6">
                  <div></div>
                </div>
                <div className="box box7">
                  <div></div>
                </div>
                <div className="ground">
                  <div></div>
                </div>
              </div>
            ) : (
                children
            )}
        </SupervisorPageAPIContext.Provider>
    )

}
