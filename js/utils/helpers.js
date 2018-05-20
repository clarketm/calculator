import { is, Iterable } from "immutable";
import { createSelectorCreator, defaultMemoize } from "reselect";

export const stringToExpression = string => {
  return string.replace("÷", "/").replace("×", "*");
};
export const expressionToString = expression => {
  return expression.replace("/", "÷").replace("*", "×");
};

export const ensureMutable = state => {
  return Iterable.isIterable(state) ? state.toJS() : state;
};

export const createImmutableSelector = createSelectorCreator(
  defaultMemoize,
  is
);
