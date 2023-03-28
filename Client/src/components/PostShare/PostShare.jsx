import React, { useState, useRef } from "react";
import "./PostShare.css";
import { Wallpaper, Movie, InsertEmoticon, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { upLoadImage, upLoadPost } from "../../action/UploadAction.js";
import { CircularProgress } from "@mui/material";

const PostShare = ({ locationHomePage }) => {
  const uploading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const description = useRef();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    const addNewPost = {
      userId: user._id,
      description: description.current.value,
    };
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      addNewPost.image = filename;
      try {
        console.log(data);
        dispatch(upLoadImage(data));
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(upLoadPost(addNewPost));
    resetPost();
  };

  const resetPost = () => {
    setImage(null);
    description.current.value = "";
  };

  return (
    <div className="Post-Share">
      <img
        src={
          user.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "avatarDefault.png"
        }
        alt=""
      />
      <div>
        <input
          ref={description}
          type="text"
          placeholder="Xin chào, bạn đang nghĩ gì thế ?"
        />
        <div className="Post-Options">
          <div className="Option" onClick={() => imageRef.current.click()}>
            <Wallpaper />
            <span>Ảnh</span>
          </div>
          <div className="Option">
            <Movie />
            <span>Video</span>
          </div>
          <div className="Option">
            <InsertEmoticon />
            <span>Cảm xúc / Hoạt động</span>
          </div>

          <button
            type="submit"
            className="Button-Main Btn-Post"
            disabled={uploading}
            onClick={() => {
              handleSubmit();
            }}
          >
            {uploading ? (
              <CircularProgress style={{ color: "white" }} size="20px" />
            ) : (
              "Đăng"
            )}
          </button>
          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <Close
              onClick={() => {
                setImage(null);
              }}
            />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
