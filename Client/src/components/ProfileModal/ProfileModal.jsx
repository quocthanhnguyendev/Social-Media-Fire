import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import "./ProfileModal.css";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../action/UserAction.js";
import { upLoadImage } from "../../action/UploadAction.js";

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  // const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profilePicture"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let userData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      userData.profilePicture = fileName;
      try {
        dispatch(upLoadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      userData.coverPicture = fileName;
      try {
        dispatch(upLoadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, userData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={modalOpened}
      size="50%"
      onClose={() => {
        setModalOpened(false);
      }}
    >
      <form className="Edit-Info-Form">
        <h2>Chỉnh sửa thông tin chi tiết</h2>
        <div>
          <input
            type="text"
            name="lastname"
            className="Edit-Info-Input"
            placeholder="Họ"
            onChange={handleChange}
            value={formData.lastname}
          />
          <input
            type="text"
            name="firstname"
            className="Edit-Info-Input"
            placeholder="Tên"
            onChange={handleChange}
            value={formData.firstname}
          />
        </div>

        <div>
          <input
            type="text"
            name="about"
            className="Edit-Info-Input"
            placeholder="Mô tả về bạn"
            onChange={handleChange}
            value={formData.about}
          />
        </div>

        <div>
          <input
            type="text"
            name="relationship"
            className="Edit-Info-Input"
            placeholder="Tình trạng mối quan hệ của bạn ?"
            onChange={handleChange}
            value={formData.relationship}
          />
        </div>

        <div>
          <input
            type="text"
            name="liveIn"
            className="Edit-Info-Input"
            placeholder="Bạn đang sống tại ?"
            onChange={handleChange}
            value={formData.liveIn}
          />
          <input
            type="text"
            name="country"
            className="Edit-Info-Input"
            placeholder="Quốc gia của bạn ?"
            onChange={handleChange}
            value={formData.country}
          />
        </div>

        <div>
          <input
            type="text"
            name="workAt"
            className="Edit-Info-Input"
            placeholder="Bạn đang Làm việc tại"
            onChange={handleChange}
            value={formData.workAt}
          />
        </div>

        <div>
          <span>
            Ảnh Nền
            <input
              onChange={onImageChange}
              type="file"
              name="coverPicture"
              className=""
            />
          </span>
          <span>
            ảnh đại diện
            <input
              onChange={onImageChange}
              type="file"
              name="profilePicture"
              className=""
            />
          </span>
        </div>

        <button
          type="submit"
          className="Button-Main Button-Update"
          onClick={handleSubmit}
        >
          Cập nhật
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
