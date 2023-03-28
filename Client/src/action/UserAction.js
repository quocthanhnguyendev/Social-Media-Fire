import * as UserAPI from "../api/UserRequests.js";

export const getOneUser = (userId) => async (dispatch) => {
  dispatch({ type: "USER_START" });
  try {
    const OneUserData = await UserAPI.getOneUser(userId);
    dispatch({ type: "USER_SUCCESS", data: OneUserData.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "USER_FAIL" });
  }
};

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserAPI.updateUser(id, formData);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const followerUser = (id, Data) => async (dispatch) => {
  dispatch({ type: "FOLLOW_USER" });
  UserAPI.followerUser(id, Data);
};

export const unFollowerUser = (id, Data) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_USER" });
  UserAPI.unFollowerUser(id, Data);
};
