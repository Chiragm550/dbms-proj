import jwt from 'jsonwebtoken'
import {db} from '../connect.js'
import moment from 'moment/moment.js'


export const getPosts = (req, res) => {

    const userId = req.query.userId

    const token = req.cookies.accessToken
    // console.log(token)   
    if (!token) return res.status(401).json("Not logged in")
    
    jwt.verify(token, "secretKey", (err, data) => {
        if (err) return res.status(403).json("Token is not valid")
        
        const q = userId != "undefined" ? 'SELECT DISTINCT p.*, name, p.profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.created_at DESC' : 'SELECT DISTINCT p.*, name, p.profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.created_at DESC'
    
        const values = userId != "undefined" ? userId : [data.id, data.id];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err)
            // console.log(data)
            return res.status(200).json(data)
        })
        
    })
}

export const addPosts = (req, res) => {
    const token = req.cookies.accessToken;
    // console.log(token)
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretKey", (err, data) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "INSERT INTO posts (`description`, `img`, `created_at`, `userId`) VALUES (?)";

        const values = [
            req.body.description,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            data.id
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been created");
        });
    });
};

export const deletePosts = (req, res) => {
    const token = req.cookies.accessToken;
    // console.log(token)
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretKey", (err, data) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "DELETE FROM posts WHERE `id`=? AND `userId`=?";

        const values = [req.params.id, data.id];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows > 0) return res.status(200).json("Post has been deleted");
            return res.status(403).json("You can delete only your posts")
        });
    });
}