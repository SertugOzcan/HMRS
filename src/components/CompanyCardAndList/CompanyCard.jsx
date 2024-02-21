import React, { useContext } from "react";
import "./CompanyCard.css";
import { GuestPageAPIContext } from "../../context/GuestPageAPIContext";

const CompanyCard = ({ company }) => {
  const { setSelectedCompanyId } = useContext(GuestPageAPIContext);

  const handleCardClick = () => {
    setSelectedCompanyId(company.id);
  };

  return (
    <div className="company-card-container" onClick={handleCardClick}>
      <div className="company-card-img-div">
        <img src={company.logo} alt="" />
      </div>
      <h5>
        {company.name}
        {/* 37 karakterden sonra div bozuluyor company ismi alırken sınır koyulabilir ..  */}
      </h5>
    </div>
  );
};

export default CompanyCard;
