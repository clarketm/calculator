import { applyMiddleware, compose } from "redux";
import { configureMiddleware } from "./configureMiddleware";
import { autoRehydrate } from "redux-persist-immutable";

export const configureEnhancers = () => {
  const middleware = configureMiddleware();
  const composeEnhancers = compose;

  let enhancers = [applyMiddleware(...middleware), autoRehydrate()];

  return composeEnhancers(...enhancers);
};
