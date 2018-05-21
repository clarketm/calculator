import { is, Iterable } from "immutable";
import { createSelectorCreator, defaultMemoize } from "reselect";
import { Orientation } from "./constants";

export const stringToExpression = string => {
  return string.replace("÷", "/").replace("×", "*");
};
export const expressionToString = expression => {
  return expression.replace("/", "÷").replace("*", "×");
};

export const endsWithOperator = expression => {
  return (
    expression.length > 0 && expression[expression.length - 1].match(/[+\-÷×]/)
  );
};

export const hasOperator = expression => {
  return expression.length > 0 && expression.match(/[+\-÷×]/);
};

export const notHasOperator = expression => {
  return expression.length > 0 && !expression.match(/[+\-÷×]/);
};

export const isZero = expression => {
  return Number.parseInt(expression, 10) === 0;
};

export const truncateByEvaluation = evaluation => {
  if (Number.isInteger(evaluation)) {
    return Number.parseInt(evaluation, 10).toString();
  } else {
    let result = Number.parseFloat(evaluation).toString();
    if (result.length > 8) {
      return result.slice(0, 8);
    } else {
      return result;
    }
  }
};

export const dynamicFontSize = (orientation, fontSize) => {
  if (orientation === Orientation.PORTRAIT) {
    return { fontSize };
  } else {
    return { fontSize: fontSize / 2 };
  }
};

export const ensureMutable = state => {
  return Iterable.isIterable(state) ? state.toJS() : state;
};

export const createImmutableSelector = createSelectorCreator(
  defaultMemoize,
  is
);
