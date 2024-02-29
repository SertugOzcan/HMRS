import "./AboutUsCard.css"
import {FaGithub, FaLinkedin} from 'react-icons/fa'
const AboutUsCard = ({developer}) => {
  return (
    <div className='developer-card-container'>
        <div className='developer-card-img-div'>
            <img src="https://assets-global.website-files.com/6320c9d25c243e328157e175/6320c9d25c243e17dc57e8a6_Tim%20Photo%20square.jpg" alt="" />
        </div>
        <div className='developer-card-infos'>
            <div className='developer-card-info-div'>
                <p>Name : {developer.firstName}</p>
                <p>LastName : {developer.lastName}</p>
            </div>
            <div className='developer-card-info-div'>
                <p>BirthDay : {developer.dayOfBirth}</p>
                <p>Education : {developer.education}</p>
            </div>
            <div className='developer-card-info-div-links'>
                <a href={developer.githubLink}><FaGithub/></a>
                <a href={developer.linkedInLink}><FaLinkedin/></a>
            </div>
        </div>
    </div>
  )
}

export default AboutUsCard