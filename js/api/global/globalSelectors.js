import { createImmutableSelector } from "../../utils/helpers";
import { ReducerKey } from "../../utils/constants";
import { GlobalParam } from "./globalConstants";

const __selectGlobal = state => state.get(ReducerKey.GLOBAL);

export const selectExpression = createImmutableSelector(__selectGlobal, state =>
  state.get(GlobalParam.EXPRESSION)
);

export const selectHistory = createImmutableSelector(__selectGlobal, state =>
  state.get(GlobalParam.HISTORY)
);
