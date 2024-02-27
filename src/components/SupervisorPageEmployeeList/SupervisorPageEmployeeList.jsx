import { useState, useEffect, useContext, useRef } from 'react';
import './SupervisorPageEmployeeList.css';
import EmployeeList from "../EmployeeList";
import AddEmployeeForm from "../AddEmployee";
import { SupervisorPageAPIContext } from "../../context/SupervisorPageAPIContext";

const SupervisorPageEmployeeList = () => {
    const { isAddingEmployee, setIsAddingEmployee } = useContext(SupervisorPageAPIContext);
    const formRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setIsAddingEmployee(false);
            }
        }

        function handleDragStart(event) {
            event.preventDefault();
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('dragstart', handleDragStart);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('dragstart', handleDragStart);
        };
    }, [formRef, setIsAddingEmployee]);

    return (
        <div className='calisan-listesi-major-container'>
            <div className="calisan-listesi">
                <div className="employee-list-upper-container">
                    <h3>Personnel List</h3>
                    {!isAddingEmployee && (
                        <button
                            type="button"
                            className="button-add-employee"
                            onClick={() => setIsAddingEmployee(true)}
                        >
                            <span className="button-text-add-employee">Add Employee</span>
                            <span className="button-icon-add-employee">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    height="24"
                                    fill="none"
                                    className="svg"
                                >
                                    <line y2="19" y1="5" x2="12" x1="12"></line>
                                    <line y2="12" y1="12" x2="19" x1="5"></line>
                                </svg>
                            </span>
                        </button>
                    )}
                </div>
                <div className="employee-list-container">
                    <EmployeeList />
                </div>
            </div>
            {isAddingEmployee && (
                <div className="modal-background">
                    <div className="modal-content" ref={formRef}>
                        <AddEmployeeForm />
                    </div>
                </div>
            )}
        </div>
    );
}

export default SupervisorPageEmployeeList;
