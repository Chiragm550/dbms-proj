import React, { useState } from 'react'
import "./update.scss"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";


const Update = ({ setUpdate, user }) => {
    
    const [cover, setCover] = useState(null)
    const [profile, setProfile] = useState(null);

    const [texts, setTexts] = useState({
        name: "",
        city: "",
        website: ""
    })

    const handleChange = (e) => {
        setTexts((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (user) => {
            return makeRequest.put("/users", user);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["users"]);
            },
        }
    );

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        let coverUrl;
        let profileUrl;

        coverUrl = cover ? await upload(cover) : user.coverPic;
        profileUrl = profile ? await upload(profile) : user.profilePic;

        // console.log("Hello", coverUrl, profileUrl)

        // if (file) imgUrl = await upload();
        const uid = parseInt(JSON.parse(localStorage.getItem("user")).id)
        console.log(uid)
        mutation.mutate({...texts, coverPic:coverUrl, profilePic:profileUrl});
        localStorage.setItem("user", JSON.stringify({...texts, id:uid, coverPic: coverUrl, profilePic: profileUrl}));
        setUpdate(false)
        setCover(null)
        setProfile(null)
    };


  return (
      <div className="update">
          <div className="wrapper">
              <h1>Update Your Profile</h1>
              <form>
                  <div className="files">
                      <label htmlFor="cover">
                          <span>Cover Picture</span>
                          <div className="imgContainer">
                              <img src={cover ? URL.createObjectURL(cover) : "/upload/" + user.coverPic} alt="" />
                              <CloudUploadIcon className="icon" />
                          </div>
                      </label>
                      <input
                          type="file"
                          id="cover"
                          style={{display: "none"}}
                          onChange={(e) => setCover(e.target.files[0])}
                      />
                      <label htmlFor="profile">
                          <span>Profile Picture</span>
                          <div className="imgContainer">
                              <img src={profile ? URL.createObjectURL(profile) : "/upload/" + user.profilePic} alt="" />
                              <CloudUploadIcon className="icon" />
                          </div>
                      </label>
                      <input
                          type="file"
                          id="profile"
                          style={{display: "none"}}
                          onChange={(e) => setProfile(e.target.files[0])}
                      />
                  </div>
                  <label>Name</label>
                  <input type="text" value={texts.name} name="name" onChange={handleChange} />
                  <label>Country / City</label>
                  <input type="text" name="city" value={texts.city} onChange={handleChange} />
                  <label>Website</label>
                  <input type="text" name="website" value={texts.website} onChange={handleChange} />
                  <button onClick={handleClick}>Update</button>
              </form>
              <button className="close" onClick={() => setUpdate(false)}>
                  close
              </button>
          </div>
      </div>
  );
}

export default Update
