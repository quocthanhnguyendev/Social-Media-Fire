import React from "react";
import PostShare from "../PostShare/PostShare";
import Posts from "../Posts/Posts";
import "./PostsSite.css";

const PostsSite = ({ location }) => {
  return (
    <div className="Posts-Site">
      <PostShare locationHomePage={location} />
      <Posts location={location} />
    </div>
  );
};

export default PostsSite;
