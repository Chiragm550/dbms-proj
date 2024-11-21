import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import {useLocation} from "react-router-dom";
import {useQueryClient, useQuery, useMutation} from "@tanstack/react-query";
import {makeRequest} from "../../axios";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import Update from "../../components/update/Update";

const Profile = () => {
    const [update, setUpdate] = useState(false);
    const {currentUser} = useContext(AuthContext);
    const userId = parseInt(useLocation().pathname.split("/")[2]);

    const {isLoading, error, data} = useQuery(["users"], async () => {
        const res = await makeRequest.get("/users/find/" + userId);
        return res?.data ?? []; // Ensure we return the data property
    });

    const {isLoading: rIsLoading, data: relationshipData} = useQuery(["relationships"], async () => {
        const res = await makeRequest.get("/relationships?followedUserId=" + userId);
        return res?.data ?? []; // Ensure we return the data property
    });

    const {isLoading: fIsLoading, data: followData} = useQuery(["followers"], async () => {
        const res = await makeRequest.get("/relationships/followers/"+userId);
        return res?.data ?? [];
    });

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (following) => {
            if (following) return makeRequest.delete("/relationships?userId=" + userId);
            return makeRequest.post("/relationships", {userId});
        },
        {
            onSuccess: () => {
                // Invalidate both relationships and followers queries to get updated data
                queryClient.invalidateQueries(["relationships"]);
                queryClient.invalidateQueries(["followers"]);
                // console.log(followData)
            },
        }
    );

    // console.log("Follower", followData[0][0])

    const handleFollow = () => {
        mutation.mutate(relationshipData.includes(currentUser.id));
    };

    return (
        <div className="profile">
            {isLoading ? (
                "loading"
            ) : (
                <>
                    <div className="images">
                        <img src={"/uploads/" + data.coverPic} alt="" className="cover" />
                        <img src={"/uploads/" + data.profilePic} alt="" className="profilePic" />
                    </div>
                    <div className="profileContainer">
                        <div className="uInfo">
                            <div className="left">
                                <a href="http://facebook.com">
                                    <FacebookTwoToneIcon fontSize="large" />
                                </a>
                                <a href="http://facebook.com">
                                    <InstagramIcon fontSize="large" />
                                </a>
                                <a href="http://facebook.com">
                                    <TwitterIcon fontSize="large" />
                                </a>
                                <a href="http://facebook.com">
                                    <LinkedInIcon fontSize="large" />
                                </a>
                                <a href="http://facebook.com">
                                    <PinterestIcon fontSize="large" />
                                </a>
                            </div>
                            <div className="center">
                                <span>{data.name}</span>
                                <div className="info">
                                    <div className="item">
                                        <PlaceIcon />
                                        <span>{data.city}</span>
                                    </div>
                                    <div className="item">
                                        <LanguageIcon />
                                        <span>{data.website}</span>
                                    </div>
                                    <div className="item">
                                        <LanguageIcon />
                                        <span>
                                            Followers{" "}
                                            {rIsLoading ? "Loading" : (fIsLoading ? "Loading" : followData[0].length ?? 0)}
                                        </span>
                                    </div>
                                </div>
                                {rIsLoading ? (
                                    "Loading"
                                ) : userId === currentUser.id ? (
                                    <button onClick={() => setUpdate(true)}>Update</button>
                                ) : (
                                    <button onClick={handleFollow}>
                                        {relationshipData.includes(currentUser.id) ? "Following" : "Follow"}
                                    </button>
                                )}
                            </div>
                            <div className="right">
                                <EmailOutlinedIcon />
                                <MoreVertIcon />
                            </div>
                        </div>
                        <Posts userId={userId} />
                    </div>
                </>
            )}
            {update && <Update setUpdate={setUpdate} user={data} />}
        </div>
    );
};

export default Profile;
