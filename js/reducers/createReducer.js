import { combineReducers } from "redux-immutable";
import { ReducerKey } from "../utils/constants";
import globalReducer from "../api/global/globalReducer";

export const createReducer = () => {
  return combineReducers({
    [ReducerKey.GLOBAL]: globalReducer
  });
};

export const rootReducer = createReducer();
