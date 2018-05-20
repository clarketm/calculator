import { createStore } from "redux";
import { configureEnhancers } from "../middleware/configureEnhancers";
import { rootReducer } from "../reducers/createReducer";
import { Map } from "immutable";
import { AsyncStorage } from "react-native";
import { persistStore } from "redux-persist-immutable";

export const configureStore = (initialState = Map()) => {
  let store = createStore(rootReducer, initialState, configureEnhancers());
  persistStore(store, { storage: AsyncStorage });
  return store;
};

export default configureStore;
