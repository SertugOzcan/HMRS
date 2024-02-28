/* eslint-disable react/prop-types */
import { useContext } from 'react'
import "./SupervisorPageAdvanceRequestCard.css"
import { SupervisorPageAdvanceAPIContext } from '../../context/SupervisorPageAdvanceAPIContext';
// import { confirmAlert } from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';

const SupervisorPageAdvanceRequestCard = ({request}) => {
    const {handleAdvanceDecision} = useContext(SupervisorPageAdvanceAPIContext);
    // const showCustomConfirm = () => {
    //     confirmAlert({
    //       customUI: ({ onClose }) => (
    //         <div className='custom-ui'>
    //           <h1>Custom Confirm</h1>
    //           <p>Are you sure?</p>
    //           <button onClick={onClose}>No</button>
    //           <button
    //             onClick={() => {
    //               // Handle confirmation
    //               onClose();
    //             }}
    //           >
    //             Yes
    //           </button>
    //         </div>
    //       ),
    //     });
    //   };

    const handleAdvanceDecisionConfirmation = (e, id, decision) => {
        e.preventDefault();
        let confirmation;
        if(decision === "ACCEPTED"){
            let confirmationText = request.amount > request.advanceQuota ? 
            "This personnel is requesting more amount than their advance quota. Are you still sure to accept advance request of this personnel?" 
            : 
            "Are you sure to accept advance request of this personnel";
            confirmation = window.confirm(confirmationText)
        } else {
            confirmation = window.confirm("Are you sure to decline advance request of this personnel?")
        }
        if(confirmation) {
            handleAdvanceDecision(id, decision);
        }
      }

    return (
        <div className={`advance-request-card-container supervisor-${request.requestStatus}`}>
            <div className='advance-request-card-img'>
                <img src={request.image} alt="Personnel Image" />
            </div>
            <div className="advance-request-card-body">
                <div className='advance-request-card-data-div'>
                    <h3>NAME</h3>
                    <p>{request.name} {request.lastName}</p>
                </div>
                <div className='advance-request-card-data-div'>
                    <h3>REQUEST DATE</h3>
                    <p>{request.createdAt}</p>
                </div>
                <div className='advance-request-card-data-div'>
                    <h3>DESCRIPTION</h3>
                    <p>{request.description}</p>
                </div>
                <div className='advance-request-card-data-div'>
                    <h3>AMOUNT</h3>
                    <p>{request.amount} TL</p>
                </div>
                <div className='advance-request-card-data-div'>
                    <h3>ADVANCE QUOTA</h3>
                    <p>{request.advanceQuota} TL</p>
                </div>
                <div className='advance-request-card-data-div'>
                    <h3>STATUS</h3>
                    <p>{request.requestStatus}</p>
                </div>
                {/* <div className='advance-request-card-data-div'>
                    <button onClick={showCustomConfirm}>Show Custom Confirm</button>
                </div> */}
                {request.requestStatus === "PENDING" ? 
                <div className='advance-request-card-buttons'>
                    <button className='advance-accept-button' onClick={(e) => handleAdvanceDecisionConfirmation(e, request.id, "ACCEPTED")}>Accept</button>
                    <button className='advance-decline-button' onClick={(e) => handleAdvanceDecisionConfirmation(e, request.id, "DECLINED")}>Decline</button>
                </div>
                :
                <div className='advance-request-card-data-div'>
                    <h3>UPDATED AT</h3>
                    <p>{request.updatedAt}</p>
                </div>
                }
            </div>        
        </div>
    )
    }

export default SupervisorPageAdvanceRequestCard