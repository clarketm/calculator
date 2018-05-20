import { createLogger } from "redux-logger";
import { ensureMutable } from "../utils/helpers";
import { InstanceType, PrimitiveType } from "../utils/constants";

const filterOutActions = [/.*REQUEST/];

const defaultConfig = {
  level: "debug",
  collapsed: true,
  diff: false,
  stateTransformer: ensureMutable,
  predicate: (getState, { type }) =>
    filterOutActions.every(filter => {
      if (typeof filter === PrimitiveType.STRING) return filter !== type;
      if (filter instanceof InstanceType.REGEXP) return !filter.test(type);
      return true;
    })
};

function createActionMonitor(options = {}) {
  return createLogger({
    ...defaultConfig,
    ...options
  });
}

export const actionMonitor = createActionMonitor();
