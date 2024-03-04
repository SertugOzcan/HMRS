import AboutUsCard from "./AboutUsCard";
import "./AboutUsCardList.css";
const AboutUsCardList = () => {
  const developerInfos = [
    {
      firstName: "Ali Volkan",
      lastName: "Şahin",
      dayOfBirth: "07.03.1999",
      education:"Kirklareli University",
      image: "./DeveloperImages/bahadir.jpg",
      githubLink: "https://github.com/BahadirUnsall",
      linkedInLink: "https://www.linkedin.com/in/bahadirunsal/"
    },
    {
      firstName: "Bahadir",
      lastName: "Unsal",
      dayOfBirth: "07.03.1999",
      education:"Kirklareli University",
      image: "./DeveloperImages/bahadir.jpg",
      githubLink: "https://github.com/BahadirUnsall",
      linkedInLink: "https://www.linkedin.com/in/bahadirunsal/"
    },
    {
      firstName: "Muhittin",
      lastName: "Ülker",
      dayOfBirth: "21.10.1992",
      education:"Karabuk University",
      image: "./DeveloperImages/muhittin.jpg",
      githubLink: "https://https://github.com/MuhittinUlker",
      linkedInLink: "https://www.linkedin.com/in/muhittinulker/"
    },
    {
      firstName: "Sertuğ",
      lastName: "Özcan",
      dayOfBirth: "07.03.1999",
      education:"Kirklareli University",
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