import express from "express";
import {
	addNewPost,
	deletePost,
	getOnePost,
	getTimeLine,
	likePost,
	updatePost,
} from "../Controllers/PostController.js";

const router = express.Router();

router.post("/", addNewPost);
router.get("/:id", getOnePost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.put("/:id/like", likePost);
router.get("/:id/timeline", getTimeLine);

export default router;
