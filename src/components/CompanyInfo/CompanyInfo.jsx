import React from 'react'
import "./CompanyInfo.css"
import PersonnelCard from './PersonnelCard'
import HrCard from './HrCard'
import CommentCard from './CommentCard'
const CompanyInfo = () => {
  return (
    <div className='company-page-container'>
        <div className='company-infos'>
            
                <div className='company-img-div'>
                    <img src="https://www.candanofset.com/files/hizmetlerimiz/trendyol_sticker.png" alt="" />
                </div>
                <div className='company-infos-texts'>
                    <p>Company Name  : FourMusketeers</p>
                    <p>Date          : 2023</p>
                    <p>Address : Ankara/ kızılay</p>
                    <p>Personnel Count : 257</p>
                </div>
            
        </div>



        <div className='main-div'>
            <div className='main-infos'>
                <div className='hr-info'>
                <HrCard />
                </div>
                <div className='personnel-info'>
                <PersonnelCard />
                </div>
            </div>
            <div className='comment-info'>
                <CommentCard />
                <CommentCard />
            </div>
        </div>
    </div>
  )
}

export default CompanyInfo