import React from "react";
import "./Home.css";
import LeftSite from "../../components/LeftSite/LeftSite";
import PostsSite from "../../components/PostsSite/PostsSite";
import RightSite from "../../components/RightSite/RightSite";

const Home = () => {
  return (
    <div className="Home">
      <LeftSite />
      <PostsSite location="HomePostShare" />
      <RightSite />
    </div>
  );
};

export default Home;
