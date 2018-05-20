import {
  UPDATE_EXPRESSION,
  UPDATE_HISTORY,
  TOGGLE_IS_DIRTY,
  TOGGLE_IS_EVALUATED
} from "./globalConstants";

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

export const updateExpression = expression => ({
  type: UPDATE_EXPRESSION,
  expression
});

export const updateExpressionAsync = expression => {
  return async dispatch => {
    return await dispatch(updateExpression(expression));
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
