import { useContext } from "react";
import "./stories.scss"
import { AuthContext } from "../../context/AuthContext"; 
import yodaImage from "../../assets/yoda.jpeg";
import grootImage from "../../assets/groot.jpeg";
import manImage from "../../assets/man.jpeg";


const Stories = () => {

  const {currentUser} = useContext(AuthContext)

  
  const stories = [
    {
      id: 1,
      name: "ChiragCShekar",
      img: yodaImage,
    },
    {
      id: 2,
      name: "ChiragM",
      img: grootImage ,
    },
    {
      id: 3,
      name: "ChiragA",
      img: manImage,
    },
    {
      id: 4,
      name: "Diddy",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];

  return (
    <div className="stories">
      <div className="story">
          <img src={currentUser.profilePic} alt="" />
          <span>{currentUser.name}</span>
          <button>+</button>
        </div>
      {stories.map(story=>(
        <div className="story" key={story.id}>
          <img src={story.img} alt="" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories