import * as UpLoadAPI from "../api/UploadRequest.js";

export const upLoadImage = (data) => async (dispatch) => {
  try {
    await UpLoadAPI.upLoadImage(data);
  } catch (error) {
    console.log(error);
  }
};

export const upLoadPost = (dataUpload) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const data = await UpLoadAPI.upLoadPost(dataUpload);
    dispatch({ type: "UPLOAD_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};
