import {useContext, useState} from "react";
import "./comments.scss";
import { AuthContext } from "../../context/AuthContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import moment from "moment"
import {makeRequest} from "../../axios.js"

const Comments = ({postId}) => {
    const { currentUser } = useContext(AuthContext);
    
    const { isLoading, error, data } = useQuery(['comments'], async () => {
        try {
            const res = await makeRequest.get("/comments?postId=" + postId)
            return res?.data ?? []
        }
        catch (error) {
            console.error("Error fetching comments ", error);
            throw error 
        }
    })

    const [description, setDescription] = useState("")

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newComment) => {
            return makeRequest.post("/comments", newComment);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["comments"]);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({description, postId});
        setDescription("");
    };


    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input type="text" placeholder="write a comment" onChange={(e)=>setDescription(e.target.value)} value={description}/>
                <button onClick={handleClick}>Send</button>
            </div>
            { isLoading ? "Loading" : data.map((comment) => (
                <div className="comment" key={comment.id}>
                    <img src={comment.profilePicture} alt="" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.description}</p>
                    </div>
                    <span className="date">{ moment(comment.createdAt).fromNow() }</span>
                </div>
            ))}
        </div>
    );
};

export default Comments;
