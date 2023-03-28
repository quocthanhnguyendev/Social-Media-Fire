import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt"; //Mã hoá mật khẩu
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
	// Ma hoa mat khau
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);
	req.body.password = hashedPassword;
	const newUser = UserModel(req.body);
	const { username } = req.body;
	try {
		const exitsUser = await UserModel.findOne({ username });
		if (exitsUser) {
			return res.status(400).json({ message: "Username is already registered!" });
		}
		const user = await newUser.save();
		const token = jwt.sign(
			{
				username: user.username,
				id: user._id,
			},
			process.env.JSONWEBTOKEN_KEY,
			{ expiresIn: "1h" }
		);
		res.status(200).json({ user, token });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const loginUser = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await UserModel.findOne({ username: username });
		if (user) {
			const validity = await bcrypt.compare(password, user.password);
			if (!validity) {
				res.status(400).json("Password is not correct");
			} else {
				const token = jwt.sign(
					{
						username: user.username,
						id: user._id,
					},
					process.env.JSONWEBTOKEN_KEY,
					{ expiresIn: "1h" }
				);
				res.status(200).json({ user, token });
			}
		} else {
			res.status(404).json("User does not exists");
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
