import { db } from "../connect.js";
import jwt from "jsonwebtoken"
import moment from "moment";

export const getComments = (req, res) => {

    const q =
        "SELECT c.*, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC";

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const addComments = (req, res) => {
    const token = req.cookies.accessToken;
    // console.log(token)
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretKey", (err, data) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "INSERT INTO comments (`description`, `createdAt`, `userId`, `postId`) VALUES (?)";

        const values = [req.body.description, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"), data.id, req.body.postId];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Comment has been created");
        });
    });
};