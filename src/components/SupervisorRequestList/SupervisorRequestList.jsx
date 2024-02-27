/* eslint-disable react/prop-types */
import { useContext } from "react";
import styles from './SupervisorRequestList.module.css'
import SupervisorRequestCard from "../SupervisorRequestCard/SupervisorRequestCard";
import { AdminPagePendingSupervisorsAPIContext } from "../../context/AdminPagePendingSupervisorsAPIContext";

const SupervisorRequestList = () => {

  const {pendingSupervisors} = useContext(AdminPagePendingSupervisorsAPIContext);

  return (
    <>
    <section className={styles["supervisor-request-list-section"]}>
        {/* {isLoading.read && <h1>LOADING REQUESTS...</h1>} */}
        <article className={styles["supervisor-request-list-article"]}>
          {pendingSupervisors.map((request)=> (
            <SupervisorRequestCard key={request.id} request={request}/>
          ))}
        </article>
    </section>
    </>
  );
};

export default SupervisorRequestList

