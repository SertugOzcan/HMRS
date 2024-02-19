import React from 'react'
import "./CommentCard.css"
const CommentCard = () => {
  return (
    <div className='comment-card-container'>
        <div className='comment-card-img-div'>
            <img src="https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg" alt="" />
        </div>
        <div className='comment-card-texts'>
            <h4>Arda Güler</h4>
            <p>Ben mi vurucam abi Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque amet dolores modi molestiae dicta sit ea, nostrum neque aspernatur sint doloremque consequatur reiciendis, natus maiores. Praesentium voluptatibus est id beatae? Lorem ipsum, dolor sit amet 
            </p>
        </div>
    </div>
  )
}

export default CommentCard