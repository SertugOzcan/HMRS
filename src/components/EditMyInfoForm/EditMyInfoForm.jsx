import React, { useContext, useState } from "react";
import { PersonnelPageAPIContext } from "../../context/PersonalPageAPIContext";
import "./EditMyInfoForm.css";

const EditMyInfoForm = () => {
  const { handleEditMyInfo } = useContext(PersonnelPageAPIContext);

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [workPhone, setWorkPhone] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      name.trim() &&
      lastName.trim() &&
      email.trim() &&
      phone.trim()
      //   img.trim() &&
    ) {
      if (phone.length !== 11) {
        alert("Check personnel's phone number!");
        return;
      }
    //   let newImg;
    //   if (img === "") {
    //     newImg = gender
    //       ? "https://i.imgur.com/BNXkMgI.png"
    //       : "https://i.imgur.com/ltRBj9D.png";
    //   } else {
    //     newImg = img.trim();
    //   }

      const newPersonnelInfo = {
        name: name.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        // image: newImg,
        phone: phone.trim()
      };

      handleEditMyInfo(newPersonnelInfo);
    }
  };

  return (
    <>
      <h3 className="edit-info-name">Edit My Info</h3>
      <div className="edit-form-container">
        <form onSubmit={handleSubmit}>
          <input
            className="edit-my-info-input"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            className="edit-my-info-input"
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
          <input
            className="edit-my-info-input"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="edit-my-info-input"
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            required
          />
          <input
            className="edit-my-info-input"
            type="text"
            name="img"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            placeholder="Image URL"
          />
          <br />
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
        </form>
      </div>
    </>
  );
};

export default EditMyInfoForm;
