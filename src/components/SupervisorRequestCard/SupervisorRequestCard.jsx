/* eslint-disable react/prop-types */
import styles from './SupervisorRequestCard.module.css';

import { useContext } from 'react';
import { AdminPageAPIContext } from '../../context/AdminPageAPIContext';

const SupervisorRequestCard = ({request}) => {

    const {handleSupervisorRequest} = useContext(AdminPageAPIContext);


    const handleApprove = (event) => {
        // event.preventDefault();
        handleSupervisorRequest(request.authId, true);
    }

    const handleDecline = (event) => {
        // event.preventDefault();
        handleSupervisorRequest(request.authId, false);
    }

    return (
        <div className={styles['recipe-card-div']}>
            <div className={styles['recipe-image-div']}>
                <img src={request.image} />
            </div>
            <div className={styles['recipe-details-div']}>
                <div className={styles['recipe-description-div']}>
                    <p>Name:{request.name} {request.lastName}</p>
                    <p>Gender: {request.gender}</p>
                    <p>Mail: {request.email}</p>
                    <p>Phone: {request.phone}</p>
                    <p>Company Name:{request.companyName}</p>
                </div>
                <div className={styles['recipe-difficulty-div']}>              
                    <div className={styles['button-div']}> 
                        <div className={styles['add-to-fav-div']}onClick={handleApprove}>
                            <span className={styles['fav-span']}>Approve</span>   
                        </div>
                        <div className={styles['remove-from-fav-div']}onClick={handleDecline}>
                            <span className={styles['fav-span']}>Decline</span>   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SupervisorRequestCard