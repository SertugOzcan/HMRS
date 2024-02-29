import { useEffect, useState } from 'react'
import PersonnelCard from './PersonnelCard'
import axios from 'axios'
import  Carousel  from 'react-carousel';
const PersonnelCardList = () => {
    const [personnelInfos, setPersonnelInfos] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:80/personnel/get-all');
                setPersonnelInfos(response.data);
            } catch (error) {
                console.error('Error fetching HR infos:', error);
            }
        };

        fetchData();
    }, []);

  return (
    <Carousel>
        {personnelInfos.map((personnelInfo, index) => (
            <PersonnelCard key={index} personnelInfo={personnelInfo} />
        ))}
    </Carousel>
  )
}

export default PersonnelCardList