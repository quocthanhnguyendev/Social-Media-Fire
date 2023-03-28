import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";
import InfoCard from "../InfoCard/InfoCard";
import "./InformationFollower.css";
const InformationFollower = () => {
  return (
    <div className="Information-Follower">
      <InfoCard />
      <FollowersCard />
    </div>
  );
};

export default InformationFollower;
