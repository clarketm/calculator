import { createStore } from "redux";
import { configureEnhancers } from "../middleware/configureEnhancers";
import { rootReducer } from "../reducers/createReducer";
import { Map } from "immutable";

export const configureStore = (initialState = Map()) => {
  return createStore(rootReducer, initialState, configureEnhancers());
};

export default configureStore;
