import { createImmutableSelector } from "../../utils/helpers";
import { ReducerKey } from "../../utils/constants";
import { GlobalParam } from "./globalConstants";

const __selectGlobal = state => state.get(ReducerKey.GLOBAL);

export const selectExpression1 = createImmutableSelector(__selectGlobal, state =>
  state.get(GlobalParam.EXPRESSION1)
);

export const selectExpression2 = createImmutableSelector(__selectGlobal, state =>
  state.get(GlobalParam.EXPRESSION2)
);

export const selectResult = createImmutableSelector(__selectGlobal, state =>
  state.get(GlobalParam.RESULT)
);

export const selectOperator = createImmutableSelector(__selectGlobal, state =>
  state.get(GlobalParam.OPERATOR)
);

export const selectHistory = createImmutableSelector(__selectGlobal, state =>
  state.get(GlobalParam.HISTORY)
);

export const selectOrientation = createImmutableSelector(__selectGlobal, state =>
  state.get(GlobalParam.ORIENTATION)
);

export const selectLastKey = createImmutableSelector(__selectGlobal, state =>
  state.get(GlobalParam.LAST_KEY)
);

export const selectIsDirty = createImmutableSelector(__selectGlobal, state =>
  state.get(GlobalParam.IS_DIRTY)
);

export const selectIsEvaluated = createImmutableSelector(__selectGlobal, state =>
  state.get(GlobalParam.IS_EVALUATED)
);
