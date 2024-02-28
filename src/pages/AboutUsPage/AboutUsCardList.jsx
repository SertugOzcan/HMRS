import React from 'react'
import AboutUsCard from "./AboutUsCard";
import "./AboutUsCardList.css";
const AboutUsCardList = () => {
  const developerInfos = [
    {
      firstName: "Bahadir",
      lastName: "Unsal",
      dayOfBirth: "07.03.1999",
      education:"Kirklareli Univercity",
      image: "./DeveloperImages/bahadir.jpg",
      githubLink: "https://github.com/BahadirUnsall",
      linkedInLink: "https://www.linkedin.com/in/bahadirunsal/"
    },
    {
      firstName: "Bahadir",
      lastName: "Unsal",
      dayOfBirth: "07.03.1999",
      education:"Kirklareli Univercity",
      image: "./DeveloperImages/bahadir.jpg",
      githubLink: "https://github.com/BahadirUnsall",
      linkedInLink: "https://www.linkedin.com/in/bahadirunsal/"
    },
    {
      firstName: "Bahadir",
      lastName: "Unsal",
      dayOfBirth: "07.03.1999",
      education:"Kirklareli Univercity",
      image: "./DeveloperImages/bahadir.jpg",
      githubLink: "https://github.com/BahadirUnsall",
      linkedInLink: "https://www.linkedin.com/in/bahadirunsal/"
    },
    {
      firstName: "Bahadir",
      lastName: "Unsal",
      dayOfBirth: "07.03.1999",
      education:"Kirklareli Univercity",
      image: "./DeveloperImages/bahadir.jpg",
      githubLink: "https://github.com/BahadirUnsall",
      linkedInLink: "https://www.linkedin.com/in/bahadirunsal/"
    }
  ]

  return (
    <div className="about-us-card-list">
      {developerInfos.map((developer, index) => (
        <AboutUsCard key={index} developer={developer} />
      ))}
      {/* <AboutUsCard />
      <AboutUsCard />
      <AboutUsCard />
      <AboutUsCard /> */}
    </div>
  );
}

export default AboutUsCardList