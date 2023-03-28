import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Lấy 1 user theo id
export const getOneUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Lấy tất cả user
export const getAllUser = async (req, res) => {
  try {
    let users = await UserModel.find();
    users.map((user) => {
      const { password, ...other } = user._doc;
      return other;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Cập nhật một user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentAdminStatus, password } = req.body;
  if (id === _id || currentAdminStatus) {
    try {
      // Khi truyền vào gì thì sẽ được thay đổi cái đó, mọi thông tin còn lại giữ nguyên

      // Nếu người dùng thay đổi mất khẩu thì phải mã hoá
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
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
      res.status(500).json(error);
    }
  } else {
    // Từ chối quyền truy cập
    res.status(403).json("Access Denied, you only update your profile");
  }
};

// Xoá một user
export const deleteUser = async (req, res) => {
  const id = req.body.id;
  const { currentUserId, currentAdminStatus } = req.body;
  if (currentUserId === id || currentAdminStatus) {
    try {
      await UserModel.findOneAndDelete(id);
      res.status(200).json("Deleted Success");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied, you only delete your profile");
  }
};

// Theo dõi một user
export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Can not follow yourself");
  } else {
    try {
      const currentUser = await UserModel.findById(_id);
      const followUser = await UserModel.findById(id);
      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await currentUser.updateOne({ $push: { following: id } });
        res.status(200).json("Followed Success");
      } else {
        res.status(403).json("You followed! can not follow again");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

// Huỷ theo dõi một user
export const unFollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Can not unfollow yourself");
  } else {
    try {
      const currentUser = await UserModel.findById(_id);
      const followUser = await UserModel.findById(id);
      if (followUser.followers.includes(_id)) {
        await followUser.updateOne({ $pull: { followers: _id } });
        await currentUser.updateOne({ $pull: { following: id } });
        res.status(200).json("Unfollowed Success");
      } else {
        res.status(403).json("You unfollowed! can not follow again");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
