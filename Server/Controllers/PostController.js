import mongoose from "mongoose";
import PostModel from "../Models/PostModel.js";
import UserModel from "../Models/userModel.js";

//  Tạo một bài viết
export const addNewPost = async (req, res) => {
	const post = new PostModel(req.body);
	try {
		await post.save();
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Lấy một bài viết
export const getOnePost = async (req, res) => {
	const id = req.params.id;
	try {
		const post = await PostModel.findById(id);
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Chỉnh sửa bài viết
export const updatePost = async (req, res) => {
	const idPost = req.params.id;
	const { userId } = req.body;
	try {
		const post = await PostModel.findById(idPost);
		if (post.userId === userId) {
			await post.updateOne({ $set: req.body });
			res.status(200).json(post);
		} else {
			res.status(403).json("You only update your own post");
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

// Xoá một bài viết
export const deletePost = async (req, res) => {
	const idPost = req.params.id;
	const { userId } = req.body;
	try {
		const post = await PostModel.findById(idPost);
		if (post.userId === userId) {
			await post.deleteOne();
			res.status(200).json("Deleted Success");
		} else {
			res.status(403).json("You only delete your own post");
		}
	} catch (error) {
		res.status(500).json(error);
	}
};

// Like và Unlike một bài viết
export const likePost = async (req, res) => {
	const idPost = req.params.id;
	const { userId } = req.body;

	try {
		const post = await PostModel.findById(idPost);
		if (!post.like.includes(userId)) {
			await post.updateOne({ $push: { like: userId } });
			res.status(200).json("Liked Success");
		} else {
			await post.updateOne({ $pull: { like: userId } });
			res.status(200).json("Unliked Success");
		}
	} catch (error) {
		res.status(500).json(500);
	}
};

// Lấy dòng thời gian
export const getTimeLine = async (req, res) => {
	const userId = req.params.id;

	try {
		const currentUserPost = await PostModel.find({ userId: userId });
		const followingPosts = await UserModel.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(userId),
				},
			},
			{
				$lookup: {
					from: "posts", //Tên cơ sở dữ liệu
					localField: "following", //trường idUser User
					foreignField: "userId", //Trường idUser post
					as: "followingPosts",
				},
			},
			{
				$project: {
					followingPosts: 1,
					_id: 0,
				},
			},
		]);
		res.status(200).json(
			currentUserPost.concat(...followingPosts[0].followingPosts).sort((a, b) => {
				return b.createdAt - a.createdAt;
			}) //Nối hai mảng bài viết và sắp xếp thời gian khởi tạo giảm dần
		);
	} catch (error) {
		res.status(500).json(error);
	}
};
