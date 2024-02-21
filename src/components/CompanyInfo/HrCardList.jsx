import React, { useEffect, useState } from 'react'
import axios from 'axios';
import HrCard from './HrCard';
import  Carousel  from 'react-carousel';

const HrCardList = () => {
    const [hrInfos, setHrInfos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9092/api/v1/supervisor/get-all');
                setHrInfos(response.data);
            } catch (error) {
                console.error('Error fetching HR infos:', error);
            }
        };

        fetchData();
    }, []);
    


  return (
    <Carousel>
      {hrInfos.map((hrInfo, index) => (
        <HrCard key={index} hrInfo={hrInfo} />
      ))}
    </Carousel>
  )
}

export default HrCardList