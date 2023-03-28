import React from "react";
import "./RightSite.css";
import ProfileCard from "../ProfileCard/ProfileCard";
import FollowersCard from "../FollowersCard/FollowersCard";
import Navbars from "../Navbars/Navbars";

const RightSite = () => {
	return (
		<div className="Right-Site">
			<Navbars />
			<ProfileCard />
			<FollowersCard />
		</div>
	);
};

export default RightSite;
