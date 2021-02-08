import { userDetailReducer } from "./userDetailReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userDetails: userDetailReducer,
});

export default rootReducer;
