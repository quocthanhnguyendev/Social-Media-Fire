import React, { useEffect, useState } from "react";
import InformationFollower from "../InformationFollower/InformationFollower";
import PostsSite from "../PostsSite/PostsSite";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./ProfileContent.css";
import { useParams } from "react-router-dom";
import * as userAPI from "../../api/UserRequests.js";
import { useSelector } from "react-redux";

const ProfileContent = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const param = useParams();
  const profileUserId = param.id;
  const [profileUser, setProfileUser] = useState({});
  useEffect(() => {
    if (param) {
      const fetchProfileUser = async () => {
        const { data } = await userAPI.getOneUser(profileUserId);
        setProfileUser(data);
      };
      fetchProfileUser();
    } else {
      setProfileUser(user);
    }
  }, []);

  return (
    <div className="Profile-Content">
      <ProfileCard location="profilePage" profileData={profileUser} />
      {/* Gán location cho Profile Card tại trang Profile còn Profilecard tại trang Home không gán */}
      <div className="Information-Posts">
        <InformationFollower />
        <PostsSite location="ProfilePostPage" />
      </div>
    </div>
  );
};

export default ProfileContent;
