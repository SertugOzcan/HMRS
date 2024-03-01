import "./SupervisorPageSpendingRequestList.css";
import SupervisorPageSpendingRequestCard from "./SupervisorPageSpendingRequestCard";
import { useContext } from "react";
import {SupervisorPageSpendingAPIContext} from "../../context/SupervisorPageSpendingAPIContext";

const SupervisorPageSpendingRequestList = () => {
  const { spendingRequests } = useContext(
    SupervisorPageSpendingAPIContext
  );

  return (
    <div className="supervisor-page-spending-request-list-container">
      {spendingRequests.map((spendingRequest) => (
        <SupervisorPageSpendingRequestCard
          key={spendingRequest.id}
          request={spendingRequest}
        />
      ))}
    </div>
  );
};

export default SupervisorPageSpendingRequestList;
