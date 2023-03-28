import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import { useSelector } from "react-redux";
import User from "../User/User";
import { getAllUser } from "../../api/UserRequests";

const FollowersCard = () => {
  const [people, setPeople] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPeople = async () => {
      const { data } = await getAllUser();
      setPeople(data);
    };
    fetchPeople();
  }, []);

  return (
    <div className="Followers-Card">
      <h4>Những người có thể bạn biết</h4>
      {people.map((person, id) => {
        if (person._id !== user._id) {
          return <User person={person} key={id} />;
        }
      })}
    </div>
  );
};

export default FollowersCard;
