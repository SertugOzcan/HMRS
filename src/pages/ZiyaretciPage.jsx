import "./ZiyaretciPage.css";
import CompanyList from '../components/CompanyCardAndList/CompanyList';

// ???????


const ZiyaretciPage = () => {




  return (
    <div className='guest-page'>
      <div className="guest-container">
        <div className='guest-texts'>
          <h1>About Us</h1>
          <h3>Embarking on a Journey to Provide Our Customers with a Better Management Platform.</h3>
          <p>Musketeers, with its founders Bahadir, Sertug, Muhittin and Volkan is making a difference in the business world with our innovative approaches and strong customer relationships. We are committed to providing our customers with a superior experience. Join us and initiate your transformation.</p>
          <button className='guest-button'>Start Exploring</button>
        </div>
        <div className='guest-img'>
          <img src="https://static.vecteezy.com/system/resources/previews/024/785/747/non_2x/3d-male-character-working-on-a-laptop-free-png.png" alt="" />
        </div>
      </div>
      <div className='guest-companies-container'>
          <h1>Companies Working With Us</h1>
          <div>
            <CompanyList />
          </div>        
      </div>
    </div>
  );
}

export default ZiyaretciPage;
