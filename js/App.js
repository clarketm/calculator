import React from "react";
import Calculator from "./containers/Calculator";
import { Provider } from "react-redux";
import { fromJS } from "immutable";
import { ReducerKey } from "./utils/constants";
import configureStore from "./store/configureStore";
import { GlobalParam } from "./api/global/globalConstants";

const initialState = fromJS({
  [ReducerKey.GLOBAL]: {
    [GlobalParam.IS_DIRTY]: false,
    [GlobalParam.EXPRESSION]: "0",
    [GlobalParam.HISTORY]: []
  }
});

export default function App() {
  let store = configureStore(initialState);

  return (
    <Provider store={store}>
      <Calculator />
    </Provider>
  );
}
