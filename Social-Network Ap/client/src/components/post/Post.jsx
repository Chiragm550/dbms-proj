import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {Link} from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from "moment"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ post }) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [commentOpen, setCommentOpen] = useState(false);
    const {currentUser} = useContext(AuthContext)

    //TEMPORARY
    const { isLoading, error, data } = useQuery(["likes", post.id], async () => {
        try {
            const res = await makeRequest.get("/likes?postId=" + post.id)
            return res?.data ?? []
        }
        catch (err) {
            console.error("Error fetching likes ", err);
            throw err
        }
    })

    const queryClient = useQueryClient()

    const mutation = useMutation(
        (liked) => {
            if (liked) return makeRequest.delete("/likes?postId="+post.id)
            return makeRequest.post("/likes", {postId: post.id})
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["likes"])
            }
        }
    )

    const deleteMutation = useMutation(
        (postId) => {
            return makeRequest.delete("/posts/"+postId);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"]);
            },
        }
    );

    const handleLike = () => {
        mutation.mutate(data.includes(currentUser.id))
    }

    const handleDelete = () => {
        deleteMutation.mutate(post.id);
    };

    // console.log(post)
    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={"../../uploads/" + post.profilePic} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.userId}`} style={{textDecoration: "none", color: "inherit"}}>
                                <span className="name">{post.name}</span>
                            </Link>
                            <span className="date">{moment(post.created_at).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizIcon onClick={() => {
                        setMenuOpen(!menuOpen)
                    }} />
                    {menuOpen && post.userId === currentUser.id && (
                        <button onClick={handleDelete}>delete</button>
                    )}
                </div>
                <div className="content">
                    <p>{post.description}</p>
                    <img src={"../../uploads/" + post.img} alt="" />
                </div>
                <div className="info">
                    <div className="item">
                        { isLoading? "loading" : data && data.includes(currentUser.id) ? (
                            <FavoriteOutlinedIcon style={{ color: "red" }} onClick={ handleLike } />
                        ) : (
                                <FavoriteBorderOutlinedIcon onClick={ handleLike } />
                        )}
                        {data?.length ?? 0} Likes
                    </div>
                    <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon />
                        Comments
                    </div>
                    <div className="item">
                        <ShareOutlinedIcon />
                        Share
                    </div>
                </div>
                {commentOpen && <Comments postId={post.id} />}
            </div>
        </div>
    );
};

export default Post;
