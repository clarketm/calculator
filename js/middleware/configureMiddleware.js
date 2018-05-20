import thunk from "redux-thunk";
import createActionBuffer from "redux-action-buffer";
import { REHYDRATE } from "redux-persist/constants";
import { actionMonitor } from "./actionMonitor";

export const configureMiddleware = () => {
  let middleware = [thunk, createActionBuffer(REHYDRATE)];

  if (__DEV__) middleware.push(actionMonitor);

  return middleware;
};
