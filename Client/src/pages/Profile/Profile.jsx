import React from "react";
import ProfileContent from "../../components/ProfileContent/ProfileContent";
import TopBar from "../../components/TopBar/TopBar";
import "./Profile.css";

const Profile = () => {
	return (
		<div className="Profile">
			<TopBar />
			<ProfileContent />
		</div>
	);
};

export default Profile;
