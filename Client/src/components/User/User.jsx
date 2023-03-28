import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { followerUser, unFollowerUser } from "../../action/UserAction";
import { useState } from "react";
const User = ({ person }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState(person.followers.includes(user._id));

  const handleFollow = () => {
    followed
      ? dispatch(unFollowerUser(person._id, user))
      : dispatch(followerUser(person._id, user));
    setFollowed((prev) => !prev);
  };

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="Follower">
      <div>
        <img
          src={
            person.coverPicture
              ? serverPublic + person.profilePicture
              : serverPublic + "avatarDefault.png"
          }
          className="Follower-Image"
          alt=""
        />
        <div className="Follower-Name">
          <Link
            onClick={() => (window.location.href = `/profile/${person._id}`)}
            to={`/profile/${person._id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bolder",
            }}
          >
            <span>
              {person.firstname} {person.lastname}
            </span>
          </Link>
          <span>@{person.username}</span>
        </div>
      </div>
      <button
        className={
          followed ? " Button-Main Btn-Unfollower" : "Button-Main Btn-Follower"
        }
        onClick={handleFollow}
      >
        {followed ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
