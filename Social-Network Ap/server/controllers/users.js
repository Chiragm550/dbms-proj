import { db } from "../connect.js";
import jwt from "jsonwebtoken"

export const getUser = (req, res) => {
    const q = 'SELECT * FROM users WHERE id=?'

    db.query(q, [req.params.userId], (err, data) => {
        if (err) return res.status(500).json(err)
        const { password, ...info } = data[0]
        return res.status(200).json(info)
    })
};

export const updateUser = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretKey", (err, data) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "UPDATE users SET `name`=?,`website`=?,`city`=?,`profilePic`=?,`coverPic`=? WHERE id=?";
        const values = [
            req.body.name,
            req.body.website,
            req.body.city,
            req.body.profilePic,
            req.body.coverPic,
            data.id
        ]

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.status(200).json(data);
            return res.status(403).json("You can update only your post")
        });
    });
};