import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		image: String,
		description: String,
		like: [],
	},
	{
		timestamps: true,
	}
);

var PostModel = mongoose.model("Posts", PostSchema);
export default PostModel;
