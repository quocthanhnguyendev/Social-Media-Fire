import React, { useEffect } from "react";
import "./Post.css";
import Share from "../../img/share.png";
import Comment from "../../img/comment.png";
import NotLike from "../../img/notlike.png";
import Like from "../../img/like.png";
import { useSelector } from "react-redux";
import { useState } from "react";
import { likePost } from "../../api/PostRequests";
import * as UserAPI from "../../api/UserRequests";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [Liked, setLiked] = useState(data.like.includes(user._id));
  const [Likes, setLikes] = useState(data.like.length);
  const [userPost, setUserPost] = useState({});

  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(data._id, user._id);
    Liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  useEffect(() => {
    const postUser = async () => {
      const user = await UserAPI.getOneUser(data.userId);
      setUserPost(user.data);
    };
    postUser();
  }, []);

  return (
    <div className="Post">
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="details">
        <span>
          <b>{userPost.username || ""}</b>
        </span>
        <span> {data.description}</span>
      </div>
      <span>{Likes} lượt yêu thích</span>

      <div className="PostOptions">
        <img
          src={Liked ? Like : NotLike}
          onClick={handleLike}
          style={{ cursor: "pointer" }}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
    </div>
  );
};

export default Post;
