import { useContext, useState } from "react";
import { PersonnelPageAPIContext } from "../../context/PersonalPageAPIContext";
import "./EditMyInfoForm.css";

const EditMyInfoForm = () => {
  const { personnel, handleEditMyInfo } = useContext(PersonnelPageAPIContext);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  // const [workPhone, setWorkPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let newName = name.trim() === "" ? personnel.name : name.trim();
    let newLastName =
      lastName.trim() === "" ? personnel.lastName : lastName.trim();
    let newEmail = email.trim() === "" ? personnel.email : email.trim();
    let newPersonalPhone =
      phone.trim() === "" ? personnel.phones[0].phoneNumber : phone.trim();

    if (newPersonalPhone.length !== 11) {
      alert("Invalid phone number. Check your phone number!");
      return;
    }

    if (!/^\d{11}$/.test(newPersonalPhone)) {
      alert("Invalid characters in personnel's phone number!");
      return;
    }

    if (!newPersonalPhone.startsWith("0")) {
      alert("Invalid phone number. Phone number must start with zero!");
      return;
    }

    if(!newEmail.includes("@")){
      alert("Invalid email. Please check your email!")
      return;
    }

    const personnelInfo = {
      name: newName,
      lastName: newLastName,
      email: newEmail,
      phones: [newPersonalPhone],
    };

    const newPersonnelInfo = imgFile
      ? { ...personnelInfo, profileImageUrl: imgFile, haveFile: true }
      : imgUrl
      ? { ...personnelInfo, profileImageUrl: imgUrl, haveFile: false }
      : { ...personnelInfo, profileImageUrl: personnel.image, haveFile: false };

    handleEditMyInfo(newPersonnelInfo);
  };

  return (
    <>
      <h3 className="edit-info-name">Edit My Info</h3>
      <div className="edit-form-container">
        <form onSubmit={handleSubmit}>
          <h6>Name</h6>
          <input
            className="edit-my-info-input"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={personnel.name}
          />
          <h6>Surname</h6>
          <input
            className="edit-my-info-input"
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder={personnel.lastName}
          />
          <h6>Email</h6>
          <input
            className="edit-my-info-input"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={personnel.email}
          />
          <h6>Phone</h6>
          <input
            className="edit-my-info-input"
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={personnel.phones[0].phoneNumber}
          />
          <h6>Profile Picture URL</h6>
          <input
            className="edit-my-info-input"
            type="text"
            name="imageUrl"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            placeholder="Enter image URL"
          />
          <h6>Profile Picture</h6>
          <input
            className="edit-my-info-input"
            type="file"
            onChange={(e) => setImgFile(e.target.files[0])}
          />
          <br />
          <div className="edit-form-button-div">
            <button className="button-edit-info" type="submit">
              <span className="button-text-edit-info">Update My Info</span>
              <span className="button-icon-edit-info">
                <svg
                  className="svg"
                  fill="none"
                  height="24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="12" x2="12" y1="5" y2="19"></line>
                  <line x1="5" x2="19" y1="12" y2="12"></line>
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditMyInfoForm;
