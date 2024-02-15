/* eslint-disable react/prop-types */
import { useContext } from "react";
import styles from './SupervisorRequestList.module.css'
import { AdminPageAPIContext } from "../../context/AdminPageAPIContext";
import SupervisorRequestCard from "../SupervisorRequestCard/SupervisorRequestCard";

const SupervisorRequestList = () => {

  const {supervisorRequests} = useContext(AdminPageAPIContext);

  return (
    <>
    <section className={styles["request-list-section"]}>
        {/* {isLoading.read && <h1>LOADING REQUESTS...</h1>} */}
        <article className={styles["request-list-article"]}>
          {supervisorRequests.map((request)=> (
            <SupervisorRequestCard key={request.id} request={request}/>
          ))}
        </article>
    </section>
    </>
  );
};

export default SupervisorRequestList

