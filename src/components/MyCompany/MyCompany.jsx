import React, { useContext, useEffect, useState } from 'react'
import "./MyCompany.css"
import CommentCardList from '../CompanyInfo/CommentCardList'
import AddComment from '../AddCommentComponent/AddComment'
import { PersonnelPageAPIContext } from '../../context/PersonalPageAPIContext'
import axios from 'axios'
import CommentCardListPersonnel from './CommentCardListPersonnel'
const MyCompany = () => {
    const{personnel} = useContext(PersonnelPageAPIContext);
    const [isShowAddCard, setIsShowAddCard] = useState(false);
    const [comments, setComments] = useState([])

    useEffect(() => {
        const getCompanyInfo = async () => {
            try {
              const response2 = await axios.get(
                `http://34.75.226.10:80/comment/get-all-by-company/${personnel.companyId}`
              );
              // console.log("Company active comments:", response2.data);
              if(response2.status === 200) {
                setComments(response2.data);
              }
            } catch (error) {
              console.error("Error while fetching company info:", error);
            }
        };
        getCompanyInfo();
      }, []);

      const handleAddCommentBtn = () => {
        !isShowAddCard ? setIsShowAddCard(true) : setIsShowAddCard(false);
      }

  return (
    <>
      
      <div className='my-company-container'>
          <main className="personnel-page-company-main">
            <h2>Here, you can explore and view comments related to your own company.</h2>
            <h3>Feel free to engage with the community by leaving your own comments and feedback about your company!</h3>
            <h5><em>Other staff members and registered visitors can also access and engage with these comments :) </em></h5>
          </main>
          {isShowAddCard &&
          <div>
            <AddComment setIsShowAddCard={setIsShowAddCard} />
          </div>}
          <div className='my-company-container-header'>
              <h3>Comments made by company colleagues:</h3>
              <button className="create_request_button" onClick={handleAddCommentBtn}><div className="sign_create_request">+</div>
          <div className="text_create_request">{!isShowAddCard ? "Add Comment" : "Close"}</div></button>
          </div>
          <div>
              <CommentCardListPersonnel comments={comments}/>             
          </div>

      </div>
    </>
    
  )
}

export default MyCompany