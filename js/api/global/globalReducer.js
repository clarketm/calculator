import { Map } from "immutable";
import {
  GlobalParam,
  UPDATE_EXPRESSION,
  UPDATE_HISTORY
} from "./globalConstants";

const globalReducer = (state = Map(), action) => {
  switch (action.type) {
    case UPDATE_EXPRESSION:
      return state.set(GlobalParam.EXPRESSION, action[GlobalParam.EXPRESSION]);

    case UPDATE_HISTORY:
      return state.set(GlobalParam.HISTORY, action[GlobalParam.HISTORY]);

    default:
      return state;
  }
};

export default globalReducer;
