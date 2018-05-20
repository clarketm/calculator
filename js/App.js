import React from "react";
import Calculator from "./containers/Calculator";
import { Provider } from "react-redux";
import { fromJS } from "immutable";
import { ReducerKey } from "./utils/constants";
import configureStore from "./store/configureStore";

const initialState = fromJS({
  [ReducerKey.GLOBAL]: {
    expression: "0",
    history: []
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
