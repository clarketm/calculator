import {
  TOGGLE_IS_DIRTY,
  TOGGLE_IS_EVALUATED,
  UPDATE_EXPRESSION1,
  UPDATE_EXPRESSION2,
  UPDATE_HISTORY,
  UPDATE_OPERATOR,
  SET_ORIENTATION,
  TOGGLE_LAST_KEY,
  UPDATE_RESULT
} from "./globalConstants";

export const setOrientation = orientation => ({
  type: SET_ORIENTATION,
  orientation
});

export const setOrientationAsync = orientation => {
  return async dispatch => {
    return await dispatch(setOrientation(orientation));
  };
};

export const setLastKey = lastKey => ({
  type: TOGGLE_LAST_KEY,
  lastKey
});

export const setLastKeyAsync = lastKey => {
  return async dispatch => {
    return await dispatch(setLastKey(lastKey));
  };
};

export const toggleIsDirty = isDirty => ({
  type: TOGGLE_IS_DIRTY,
  isDirty
});

export const toggleIsDirtyAsync = isDirty => {
  return async dispatch => {
    return await dispatch(toggleIsDirty(isDirty));
  };
};

export const toggleIsEvaluated = isEvaluated => ({
  type: TOGGLE_IS_EVALUATED,
  isEvaluated
});

export const toggleIsEvaluatedAsync = isEvaluated => {
  return async dispatch => {
    return await dispatch(toggleIsEvaluated(isEvaluated));
  };
};

export const updateExpression1 = expression1 => ({
  type: UPDATE_EXPRESSION1,
  expression1
});

export const updateExpression1Async = expression1 => {
  return async dispatch => {
    return await dispatch(updateExpression1(expression1));
  };
};

export const updateExpression2 = expression2 => ({
  type: UPDATE_EXPRESSION2,
  expression2
});

export const updateExpression2Async = expression2 => {
  return async dispatch => {
    return await dispatch(updateExpression2(expression2));
  };
};

export const updateResult = result => ({
  type: UPDATE_RESULT,
  result
});

export const updateResultAsync = result => {
  return async dispatch => {
    return await dispatch(updateResult(result));
  };
};

export const updateOperator = operator => ({
  type: UPDATE_OPERATOR,
  operator
});

export const updateOperatorAsync = operator => {
  return async dispatch => {
    return await dispatch(updateOperator(operator));
  };
};

export const updateHistory = history => ({
  type: UPDATE_HISTORY,
  history
});

export const updateHistoryAsync = history => {
  return async dispatch => {
    return await dispatch(updateHistory(history));
  };
};
