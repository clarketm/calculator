import { is } from "immutable";
import { createSelectorCreator, defaultMemoize } from "reselect";

export const stringToExpression = string => {
  return string.replace("÷", "/").replace("×", "*");
};
export const expressionToString = expression => {
  return expression.replace("/", "÷").replace("*", "×");
};

export const createImmutableSelector = createSelectorCreator(
  defaultMemoize,
  is
);
