import express from "express";
import {getRelationships, addRelationships, deleteRelationships, getFollowerCount, getSuggestions} from "../controllers/relationships.js";

const router = express.Router();
router.get("/", getRelationships);
router.get("/followers/:id", getFollowerCount)
router.get("/suggestion", getSuggestions)
router.post("/", addRelationships);
router.delete("/", deleteRelationships);

export default router;
