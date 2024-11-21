import { useContext } from "react";
import "./rightbar.scss";
import { AuthContext } from "../../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const RightBar = () => {

    const { currentUser } = useContext(AuthContext)
    
    const { isLoading, error, data } = useQuery(["suggestions"], async () => {
        const res = await makeRequest.get("/relationships/suggestion")
        return res?.data ?? []
    })

    const {isLoading: fIsLoading, data: followData} = useQuery(["follow"], async () => {
        const res = await makeRequest.get("/relationships/followers/"+currentUser.id);
        return res?.data ?? []; // Ensure we return the data property
    });

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (userId) => {
            return makeRequest.post("/relationships", {userId});
        },
        {
            onSuccess: () => {
                // Invalidate both relationships and followers queries to get updated data
                console.log("Successs")
                queryClient.invalidateQueries(["follow"]);
                queryClient.invalidateQueries(["suggestions"]);
                // console.log(followData)
            },
        }
    );

    // console.log(followData)

    const handleFollow = (id) => {
        mutation.mutate(id);
    };
    // console.log(data[0])
    // console.log(followData)


    return (
        <div className="rightBar">
            <div className="container">
                <div className="item">
                    <span>Suggestions For You</span>
                    {isLoading
                        ? "Loading"
                        : data[0].map((suggestion) => (
                              <div className="user" key={suggestion.id}>
                                  <div className="userInfo">
                                      <img src={"./uploads/"+suggestion.profilePic} alt="" />
                                      <span>{suggestion.name}</span>
                                  </div>
                                  <div className="buttons">
                                      <button onClick={() => handleFollow(suggestion.id)}>follow</button>
                                  </div>
                              </div>
                          ))}
                </div>
                <div className="item">
                    <span>My Followers</span>
                    {fIsLoading
                        ? "Loading"
                        : followData[0].map((followers) => (
                              <div className="user" key={followers.id}>
                                  <div className="userInfo">
                                      <img src={"./uploads/"+followers.profilePic} alt="" />
                                      <p>
                                          <span>{followers.name}</span>
                                      </p>
                                  </div>
                              </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default RightBar;
