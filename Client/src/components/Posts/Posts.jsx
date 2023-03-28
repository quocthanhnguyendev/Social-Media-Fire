import React, { useEffect, useState } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../action/PostAction";
import { useParams } from "react-router-dom";

const Posts = ({ location }) => {
  const dispatch = useDispatch();
  const param = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const [postsData, setPostsData] = useState(posts.data);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
    if (location === "ProfilePostPage") {
      const data = postsData.filter((post) => post.userId === param.id);
      setPostsData(data);
    }
  }, []);

  if (!postsData) {
    return "Không có bài đăng nào";
  }

  return (
    <div className="Posts">
      {loading
        ? "Loading"
        : postsData.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </div>
  );
};

export default Posts;
