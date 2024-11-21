import {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationships = (req, res) => {
    const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";

    db.query(q, [req.query.followedUserId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map((like) => like.followerUserId));
    });
};

export const addRelationships = (req, res) => {
    const token = req.cookies.accessToken;
    // console.log(token)
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretKey", (err, data) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?)";
        // console.log(req.body)

        const values = [data.id, req.body.userId];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Following");
        });
    });
};

export const deleteRelationships = (req, res) => {
    const token = req.cookies.accessToken;
    // console.log(token)
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretKey", (err, data) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";

        // const values = [data.id, req.query.postId];

        db.query(q, [data.id, req.query.userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Unfollowed");
        });
    })
}

export const getFollowerCount = (req, res) => {
    const token = req.cookies.accessToken;
    // console.log(token)
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretKey", (err, data) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "call GetMyFollowers(?);";

        // const values = [data.id, req.query.postId];
        // console.log(data)

        db.query(q, [req.params.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
}

export const getSuggestions = (req, res) => {
    const token = req.cookies.accessToken;
    // console.log(token)
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretKey", (err, data) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "CALL GetUnfollowedUsers(?);";

        // const values = [data.id, req.query.postId];
        // console.log(data)

        db.query(q, [data.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};