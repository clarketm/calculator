import { applyMiddleware, compose } from "redux";
import { configureMiddleware } from "./configureMiddleware";

export const configureEnhancers = () => {
  const middleware = configureMiddleware();
  const composeEnhancers = compose;

  let enhancers = [applyMiddleware(...middleware)];

  return composeEnhancers(...enhancers);
};
