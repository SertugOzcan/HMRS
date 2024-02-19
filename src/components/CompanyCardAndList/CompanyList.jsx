import React, { useContext } from 'react'
import "./CompanyList.css"
import { GuestPageAPIContext } from '../../context/GuestPageAPIContext'
import CompanyCard from './CompanyCard'
const CompanyList = () => {

    //const { CompanyData } = useContext(GuestPageAPIContext);

  return (
    <div className='company-list-container'>
        {/*CompanyData.map((company) => {
            <CompanyCard company = {{...company}}/>
        })*/}
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        
    </div>
  )
}

export default CompanyList