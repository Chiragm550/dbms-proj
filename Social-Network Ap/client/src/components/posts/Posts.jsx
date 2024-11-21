import { makeRequest } from "../../axios";
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";

const Posts = ({userId}) => {

    const {isLoading, error, data} = useQuery(["posts"], async () => {
        try {
            const response = await makeRequest.get("/posts?userId="+userId);
            return response?.data ?? []; // Return an empty array if response.data is undefined
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw error; // This will trigger React Query's error handling
        }
    });


    // console.log(data)   

    return (
        <div className="posts">
            {error ? "Something went wrong" : (
                isLoading ? "loading" : (
                    data.map((post) => (
                        <Post post={post} key={post.id} />
                    ))
                )
            )}
        </div>
    );
};

export default Posts;
