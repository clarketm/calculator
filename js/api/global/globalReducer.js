import { Map } from "immutable";
import {
  GlobalParam,
  UPDATE_EXPRESSION,
  UPDATE_HISTORY,
  TOGGLE_IS_DIRTY,
  TOGGLE_IS_EVALUATED
} from "./globalConstants";

const globalReducer = (state = Map(), action) => {
  switch (action.type) {
    case TOGGLE_IS_DIRTY:
      return state.set(GlobalParam.IS_DIRTY, action[GlobalParam.IS_DIRTY]);

    case TOGGLE_IS_EVALUATED:
      return state.set(
        GlobalParam.IS_EVALUATED,
        action[GlobalParam.IS_EVALUATED]
      );

    case UPDATE_EXPRESSION:
      return state.set(GlobalParam.EXPRESSION, action[GlobalParam.EXPRESSION]);

    case UPDATE_HISTORY:
      return state.set(GlobalParam.HISTORY, action[GlobalParam.HISTORY]);

    default:
      return state;
  }
};

export default globalReducer;
