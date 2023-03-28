import React, { useState } from "react";
import "./InfoCard.css";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as userAPI from "../../api/UserRequests.js";
import { followerUser, unFollowerUser } from "../../action/UserAction";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { user } = useSelector((state) => state.authReducer.authData);
  const params = useParams();
  const dispatch = useDispatch();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const { data } = await userAPI.getOneUser(profileUserId);
        setProfileUser(data);
        setFollowed(data.followers.includes(user._id));
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleFollow = () => {
    followed
      ? dispatch(unFollowerUser(profileUser._id, user))
      : dispatch(followerUser(profileUser._id, user));
    setFollowed((prev) => !prev);
  };

  return (
    <div className="Info-Card">
      <h3>Giới thiệu</h3>

      <div className="All-Info">
        <div className="info">
          <span>
            <b>Trạng thái </b>
          </span>
          <span>{profileUser.relationship}</span>
        </div>

        <div className="info">
          <span>
            <b>Sống tại </b>
          </span>
          <span>{profileUser.liveIn}</span>
        </div>

        <div className="info">
          <span>
            <b>Làm việc tại </b>
          </span>
          <span>{profileUser.workAt}</span>
        </div>
      </div>

      {user._id === profileUserId ? (
        <>
          <button
            className="Button-Main Button-Edit"
            onClick={() => {
              setModalOpened(true);
            }}
          >
            Chỉnh sửa chi tiết
          </button>
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
            data={user}
          />
        </>
      ) : (
        <button onClick={handleFollow} className="Button-Main Button-Edit">
          {followed ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default InfoCard;
