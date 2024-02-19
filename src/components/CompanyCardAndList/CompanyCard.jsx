import React from 'react'
import "./CompanyCard.css"
const CompanyCard = ({image,companyName}) => {
  return (
    <div className='company-card-container'>
        <div className='company-card-img-div'>
            <img src="https://www.candanofset.com/files/hizmetlerimiz/trendyol_sticker.png" alt="" />
        </div>
        <h5>{companyName}FourMusketeers A.Ş Ş.T.İ{/* 37 karakterden sonra div bozuluyor company ismi alırken sınır koyulabilir ..  */ }</h5>
    </div>
  )
}

export default CompanyCard