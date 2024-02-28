import "./SupervisorPageSpendingRequestList.css";
import SupervisorPageSpendingRequestCard from "./SupervisorPageSpendingRequestCard";
import { useContext } from "react";
import {SupervisorPageSpendingAPIContext} from "../../context/SupervisorPageSpendingAPIContext";

const SupervisorPageSpendingRequestList = () => {
  const { pendingSpendingRequests, notPendingSpendingRequests } = useContext(
    SupervisorPageSpendingAPIContext
  );

  return (
    <div className="supervisor-page-spending-request-list-container">
      {pendingSpendingRequests.map((spendingRequest) => (
        <SupervisorPageSpendingRequestCard
          key={spendingRequest.id}
          request={spendingRequest}
        />
      ))}
      {notPendingSpendingRequests.map((spendingRequest) => (
        <SupervisorPageSpendingRequestCard
          key={spendingRequest.id}
          request={spendingRequest}
        />
      ))}
    </div>
  );
};

export default SupervisorPageSpendingRequestList;
