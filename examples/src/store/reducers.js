import { combineReducers } from "redux";
import { actionStateReducer } from "rrethunk";
import { reducer as todos } from "./todos";

export default () =>
  combineReducers({
    todos,
    actions: actionStateReducer
  });
