/* eslint-disable react/prop-types */

import SupervisorCard from "./SupervisorCard";

const SupervisorCardList = ({ selectedCompanyInfo }) => {
  return (
    <div>
      {selectedCompanyInfo.supervisors &&
        selectedCompanyInfo.supervisors.map((supervisor, index) => (
          <SupervisorCard key={index} supervisor={supervisor} />
        ))}
    </div>
  );
};

export default SupervisorCardList;
