import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Share = () => {
  const { currentUser } = useContext(AuthContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // handle file logic
      console.log(file);
    }
  };

  const handleShareClick = () => {
    // Handle the sharing functionality here
    console.log("Post shared!");
  };

  if (!currentUser) {
    return <div>Loading...</div>; // Or any loading or fallback UI
  }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={currentUser.profilePic} alt="Profile" />
          <input type="text" placeholder={`What's on your mind, ${currentUser.name}?`} />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: "none" }} onChange={handleFileChange} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="Add Image" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="Add Place" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="Tag Friends" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleShareClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
