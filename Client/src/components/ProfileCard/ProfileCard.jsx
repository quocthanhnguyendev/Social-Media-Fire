import React from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const ProfileCard = ({ location, profileData }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const { data } = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div
      className="Profile-Card"
      style={
        location === "profilePage"
          ? { overflow: "unset" }
          : { overflow: "clip" }
      }
    >
      <div className="Profile-Image">
        <img
          src={
            location === "profilePage"
              ? profileData.coverPicture
                ? serverPublic + profileData.coverPicture
                : serverPublic + "coverDefault.jpg"
              : user.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + "coverDefault.jpg"
          }
          alt=""
        />
        {location === "profilePage" ? (
          <>
            <img
              src={
                profileData.profilePicture
                  ? serverPublic + profileData.profilePicture
                  : serverPublic + "avatarDefault.png"
              }
              style={{
                width: 200,
                height: 200,
                objectFit: "cover",
                bottom: -96,
              }}
              className="True-Avatar"
              alt=""
            />
          </>
        ) : (
          <>
            <img
              src={
                user.profilePicture
                  ? serverPublic + user.profilePicture
                  : serverPublic + "avatarDefault.png"
              }
              alt=""
            />
          </>
        )}
      </div>

      {/* Trang tất cả thông tin cá nhân */}
      {location === "profilePage" ? (
        <>
          <div
            className="Profile-Name"
            style={{ marginTop: 118, fontSize: 32 }}
          >
            <span>
              {profileData.lastname} {profileData.firstname}
            </span>
            <span style={{ fontSize: 20 }}>
              {profileData.about
                ? profileData.about
                : "Thêm thông tin về bạn ?"}
            </span>
          </div>
          <hr className="Line-Hr" />
          <div className="Profile-Follows-Posts-Following">
            <div>
              <span>
                {data.filter((post) => post.userId === profileData._id).length}
              </span>
              <span>Bài đăng</span>
            </div>

            <div>
              <span>
                {profileData.followers ? profileData.followers.length : 0}
              </span>
              <span>Người theo dõi</span>
            </div>

            <div>
              <span>
                {profileData.followers ? profileData.following.length : 0}
              </span>
              <span>Đang theo dõi</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="Profile-Name">
            <span>
              {user.lastname} {user.firstname}
            </span>
            <span>
              {user.about ? user.about : "Hãy thêm thông tin về bạn ?"}
            </span>
          </div>
          <hr className="Line-Hr" />
          <span>
            <Link
              to={`/profile/${user._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Xem tất cả trang cá nhân
            </Link>
          </span>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
