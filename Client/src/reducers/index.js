import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import postReducer from "./postReducer.js";
import userReducer from "./userReducer.js";

const reducers = combineReducers({ authReducer, postReducer, userReducer });
export default reducers;
