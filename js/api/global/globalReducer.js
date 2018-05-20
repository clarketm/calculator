import { Map } from "immutable";
import {
  GlobalParam,
  TOGGLE_IS_DIRTY,
  TOGGLE_IS_EVALUATED,
  UPDATE_EXPRESSION1,
  UPDATE_EXPRESSION2,
  UPDATE_HISTORY,
  UPDATE_OPERATOR
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

    case UPDATE_EXPRESSION1:
      return state.set(
        GlobalParam.EXPRESSION1,
        action[GlobalParam.EXPRESSION1]
      );

    case UPDATE_EXPRESSION2:
      return state.set(
        GlobalParam.EXPRESSION2,
        action[GlobalParam.EXPRESSION2]
      );

    case UPDATE_OPERATOR:
      return state.set(GlobalParam.OPERATOR, action[GlobalParam.OPERATOR]);

    case UPDATE_HISTORY:
      return state.set(GlobalParam.HISTORY, action[GlobalParam.HISTORY]);

    default:
      return state;
  }
};

export default globalReducer;
