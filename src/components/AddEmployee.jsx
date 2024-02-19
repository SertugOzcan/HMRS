import React, { useState } from 'react';

const AddEmployeeForm = ({ onAddEmployee }) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState(false);
    const [department, setDepartment] = useState("");
    const [identityNumber, setIdentityNumber] = useState("");
    const [address, setAddress] = useState("");
    const [img, setImg] = useState("");
    const [salary, setSalary] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [dateOfEmployment, setDateOfEmployment] = useState(new Date());

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            name.trim() &&
            lastName.trim() &&
            email.trim() &&
            phone.trim() &&
            identityNumber.trim() &&
            address.trim() &&
            img.trim() &&
            salary.trim() &&
            department.trim()
        ) {
            const newEmployee = {
                name: name.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                gender: gender ? "Female" : "Male",
                identityNumber: identityNumber.trim(),
                address: address.trim(),
                img: img.trim(),
                salary: salary.trim(),
                department: department.trim(),
                dateOfBirth: dateOfBirth,
                dateOfEmployment: dateOfEmployment,
            };

            onAddEmployee(newEmployee);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
                required
            />
            <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
            />
            <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                required
            />
            <div className="gender-selectorr">
                <label className="gender-labell">
                    <input
                        type="radio"
                        name="radio"
                        value="male"
                        checked={!gender}
                        onChange={() => setGender(false)}
                    />
                    <span>Male</span>
                </label>
                <label className="gender-labell">
                    <input
                        type="radio"
                        name="radio"
                        value="female"
                        checked={gender}
                        onChange={() => setGender(true)}
                    />
                    <span className="gender-span">Female</span>
                </label>
            </div>
            <input
                type="text"
                name="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Department"
                required
            />
            <input
                type="text"
                name="identityNumber"
                value={identityNumber}
                onChange={(e) => setIdentityNumber(e.target.value)}
                placeholder="Identity Number"
                required
            />
            <textarea
                id="address"
                name="address"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
            />
            <input
                type="text"
                name="img"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                placeholder="Image URL"
                required
            />
            <input
                type="number"
                name="salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Salary"
                required
            />
            <label>Date of Birth:</label>
            <input
                type="date"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
            />
            <label>Date of Employment:</label>
            <input
                type="date"
                name="dateOfEmployment"
                value={dateOfEmployment}
                onChange={(e) => setDateOfEmployment(e.target.value)}
                required
            />
            <button type="submit">Add Employee</button>
        </form>
    );
};

export default AddEmployeeForm;
