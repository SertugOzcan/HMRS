import { useContext, useEffect } from "react";
import AboutUsCard from "./AboutUsCard";
import "./AboutUsCardList.css";
import { AuthContext } from "../../context/AuthContext";
const AboutUsCardList = () => {

  const { logout } = useContext(AuthContext);

   // VOLKAN: Loginliyken tıklanılınca sidebar ekranda kalıyordu, logout yaptırtarak bi çözüm buldum maalesef...
  useEffect(() => {
    logout();
  },[]);


  const developerInfos = [
    {
      firstName: "Ali Volkan",   // EDUCATION KISMI DEĞİŞTİRİLMELİ BENCE
      lastName: "Şahin",
      dayOfBirth: "01.08.1994",
      education:"Turk Hava Kurumu University",
      image: "src\\pages\\AboutUsPage\\DeveloperImages\\alivolkan.jpg",
      githubLink: "https://github.com/alivolkansahin",
      linkedInLink: "https://www.linkedin.com/in/alivolkansahin/"
    },
    {
      firstName: "Bahadir",
      lastName: "Unsal",
      dayOfBirth: "07.03.1999",
      education:"Kirklareli University",
      image: "src\\pages\\AboutUsPage\\DeveloperImages\\bahadir.jpg",
      githubLink: "https://github.com/BahadirUnsall",
      linkedInLink: "https://www.linkedin.com/in/bahadirunsal/"
    },
    {
      firstName: "Muhittin",
      lastName: "Ülker",
      dayOfBirth: "21.10.1992",
      education:"Karabuk University",
      image: "src\\pages\\AboutUsPage\\DeveloperImages\\muhittin.jpg",
      githubLink: "https://github.com/MuhittinUlker",
      linkedInLink: "https://www.linkedin.com/in/muhittinulker/"
    },
    {
      firstName: "Sertuğ", // SERTUĞ DOLDURACAK
      lastName: "Özcan",
      dayOfBirth: "07.03.1999",
      education:"Kirklareli University",
      image: "src\\pages\\AboutUsPage\\DeveloperImages\\sertug.jpg",
      githubLink: "https://github.com/BahadirUnsall",
      linkedInLink: "https://www.linkedin.com/in/bahadirunsal/"
    }
  ]

  return (
    <div className="about-us-card-list">
      {developerInfos.map((developer, index) => (
        <AboutUsCard key={index} developer={developer} />
      ))}
    </div>
  );
}

export default AboutUsCardList