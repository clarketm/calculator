import { UPDATE_EXPRESSION, UPDATE_HISTORY } from "./globalConstants";

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
