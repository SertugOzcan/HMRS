/* eslint-disable react/prop-types */
import { useContext } from "react";
import "./CompanyInfo.css";
import { GuestPageAPIContext } from "../../context/GuestPageAPIContext";
import SupervisorCardList from "./SupervisorCardList";
import CommentCardList from "./CommentCardList";


const CompanyInfo = ({ selectedCompanyInfo, setFilteredCompanies }) => {
  const { setSelectedCompanyId, } = useContext(GuestPageAPIContext);

  if (!selectedCompanyInfo) {
    return <div>Expected company information not found.</div>;
  }

  const hrInfos = selectedCompanyInfo.hrInfos;

  const handleClose = () => {
    setSelectedCompanyId(null);
    setFilteredCompanies([]);
  };

  return (
    <div className="company-page-container">
      <div className="company-infos">
        <div className="company-img-div">
          <img
            src={selectedCompanyInfo.companyLogo || "default-logo-url"}
            alt=""
          />
        </div>
        <div className="company-infos-texts">
          <p>Company Name : {selectedCompanyInfo.companyName}</p>
          <p>Date : {selectedCompanyInfo.establishmentDate}</p>
          <p>Address : {selectedCompanyInfo.address}</p>
          <p>Personnel Count : {selectedCompanyInfo.personnelCount}</p>
        </div>
      </div>

      <div className="main-div">
        <div className="main-infos">
          <div className="hr-info">
            <h2>HR INFO</h2>
            {hrInfos &&
              hrInfos.map((hrInfo, index) => (
                <div key={index} className="hrinfo-texts">
                  <p>FirstName: <span>{hrInfo.firstName}</span></p>
                  <p>LastName: <span>{hrInfo.lastName}</span></p>
                  <p>Email: <span>{hrInfo.email}</span></p>
                  <p>Phone: <span>{hrInfo.phone}</span></p>
                </div>
              ))}
          </div>
          <div className="personnel-info">
            <SupervisorCardList selectedCompanyInfo={selectedCompanyInfo} />
          </div>
        </div>
        <div className="comment-info">
          <CommentCardList />
        </div>
      </div>
      <button className="close-button" onClick={handleClose}>
        Close
      </button>
    </div>
  );
};

export default CompanyInfo;
