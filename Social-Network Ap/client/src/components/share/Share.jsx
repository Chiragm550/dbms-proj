import "./share.scss";
import Image from "../../assets/img.png";
import Maps from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import {useContext, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
    const { currentUser } = useContext(AuthContext);
    
    const [file, setFile] = useState(null)
    const [description, setDescription] = useState("")

    const queryClient = useQueryClient()

    const mutation = useMutation(
        (newPost) => {
            return makeRequest.post("/posts", newPost)
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"])
            }
        }
    )

    const handleClick = async (e) => {
        e.preventDefault()
        let imgUrl = ""
        if (file) imgUrl = await upload()
        mutation.mutate({ description, img: imgUrl })
        setDescription("")
        setFile(null)
    }

    const upload = async () => {
        try {
            const formData = new FormData()
            formData.append("file", file)
            const res = await makeRequest.post("/upload", formData)
            return res.data
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <img src={`./uploads/${currentUser.name}`} alt="" />
                    <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} onChange={(e)=>setDescription(e.target.value)} value={description}/>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input type="file" id="file" style={{display: "none"}} onChange={(e)=>setFile(e.target.files[0])}/>
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Image</span>
                            </div>
                        </label>
                        <div className="item">
                            <img src={Maps} alt="" />
                            <span>Add Place</span>
                        </div>
                        <div className="item">
                            <img src={Friend} alt="" />
                            <span>Tag Friends</span>
                        </div>
                    </div>
                    <div className="right">
                        <button onClick={handleClick}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
