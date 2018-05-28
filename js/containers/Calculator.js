import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { CalculatorKeys } from "../components/CalculatorKeys";
import { CalculatorExpression } from "../components/CalculatorExpression";
import { CalculatorExpressionHistory } from "../components/CalculatorExpressionHistory";
import { Expression, KeyType, Orientation } from "../utils/constants";
import {
  isZero,
  stringToExpression,
  truncateByEvaluation
} from "../utils/helpers";
import {
  selectExpression1,
  selectExpression2,
  selectHistory,
  selectIsDirty,
  selectIsEvaluated,
  selectLastKey,
  selectOperator,
  selectOrientation,
  selectResult
} from "../api/global/globalSelectors";
import {
  setLastKeyAsync,
  setOrientationAsync,
  toggleIsDirtyAsync,
  toggleIsEvaluatedAsync,
  updateExpression1Async,
  updateExpression2Async,
  updateHistoryAsync,
  updateOperatorAsync,
  updateResultAsync
} from "../api/global/globalActions";

class Calculator extends Component {
  operand = (expression, key) => {
    const isLastKeyEquals = this.props.lastKey === KeyType.EQUALS;
    const isLastKeyOperator = this.props.lastKey === KeyType.OPERATOR;

    if (
      this.props.isEvaluated ||
      isZero(expression) ||
      isLastKeyEquals ||
      isLastKeyOperator
    ) {
      return `${key}`;
    } else {
      return `${expression}${key}`;
    }
  };

  equal = expression => {
    return truncateByEvaluation(eval(stringToExpression(expression))); // eslint-disable-line
  };

  percent = expression => {
    return truncateByEvaluation(expression / 100);
  };

  negate = expression => {
    return truncateByEvaluation(expression * -1);
  };

  decimal = expression => {
    /*if (this.props.isEvaluated) {
      return "0.";
    } */
    if (expression.toString().includes(".")) {
      return `${expression}`;
    } else {
      return `${expression}.`;
    }
  };

  handleLayout = ({
    nativeEvent: {
      layout: { width, height }
    }
  }) => {
    const _orientation =
      width > height ? Orientation.LANDSCAPE : Orientation.PORTRAIT;
    this.props.setOrientation(_orientation);
  };

  handleClearHistory = () => {
    this.props.updateHistory(this.props.history.clear());
  };

  handleHistoryPress = (expression, index) => {
    let result = eval(stringToExpression(expression)); // eslint-disable-line

    return Promise.all([
      this.props.updateExpression1(result),
      this.props.updateExpression2(0),
      this.props.updateResult(result),
      this.props.updateHistory(this.props.history.splice(index, 1))
    ]);
  };

  handlePress = (key, type) => {
    let {
      expression1,
      expression2,
      operator,
      history,
      lastKey,
      isEvaluated,
      result
    } = this.props;

    let showResult = isEvaluated && lastKey !== KeyType.OPERAND;
    let expNum, _expression, fullExp;

    const isLastKeyEquals = this.props.lastKey === KeyType.EQUALS;
    // const isLastKeyOperator = this.props.lastKey === KeyType.OPERATOR;

    switch (type) {
      case KeyType.CLEAR:
        return Promise.all([
          this.props.updateOperator(null),
          this.props.updateExpression1(0),
          this.props.updateExpression2(0),
          this.props.updateResult(0),
          this.props.setLastKey(KeyType.CLEAR),
          this.props.toggleIsDirty(false),
          this.props.toggleIsEvaluated(false),
          this.scrollView.scrollToEnd({ animated: false })
        ]);

      case KeyType.OPERATOR:
        if (lastKey === KeyType.OPERATOR) return this.props.updateOperator(key);

        if (lastKey === KeyType.EQUALS || !operator) {
          return Promise.all([
            this.props.updateOperator(key),
            this.props.updateExpression2(/*result ? result : */ expression1),
            // this.props.updateExpression2(expression1),
            this.props.setLastKey(KeyType.OPERATOR),
            this.props.toggleIsDirty(true),
            this.props.toggleIsEvaluated(false),
            this.scrollView.scrollToEnd({ animated: false })
          ]);
        }

        fullExp = `(${expression1})${operator}(${expression2})`;
        _expression = this.equal(fullExp);

        return Promise.all([
          this.props.updateOperator(key),
          this.props.updateExpression1(_expression),
          this.props.updateResult(_expression),
          this.props.setLastKey(KeyType.OPERATOR),
          this.props.toggleIsDirty(true),
          this.props.toggleIsEvaluated(true),
          this.props.updateHistory(history.push(fullExp)),
          this.scrollView.scrollToEnd({ animated: false })
        ]);

      case KeyType.EQUALS:
        if (!operator) return;

        fullExp = `(${expression1})${operator}(${expression2})`;
        _expression = this.equal(fullExp);

        return Promise.all([
          this.props.updateOperator(operator),
          this.props.updateExpression1(_expression),
          this.props.updateResult(_expression),
          this.props.setLastKey(KeyType.EQUALS),
          this.props.toggleIsDirty(true),
          this.props.toggleIsEvaluated(true),
          this.props.updateHistory(history.push(fullExp)),
          this.scrollView.scrollToEnd({ animated: false })
        ]);

      case KeyType.PERCENT:
        _expression = this.percent(
          isLastKeyEquals ? result : operator ? expression2 : expression1
        );

        if (isLastKeyEquals) expNum = Expression.ONE;
        else if (operator) expNum = Expression.TWO;
        else expNum = Expression.ONE;

        return Promise.all([
          isLastKeyEquals && this.props.updateResult(_expression),
          isLastKeyEquals && this.props.updateOperator(""),
          this.props[expNum](_expression),
          this.props.setLastKey(KeyType.PERCENT),
          this.props.toggleIsDirty(true),
          this.props.toggleIsEvaluated(showResult),
          this.scrollView.scrollToEnd({ animated: false })
        ]);

      case KeyType.NEGATE:
        _expression = this.negate(
          isLastKeyEquals ? result : operator ? expression2 : expression1
        );

        if (isLastKeyEquals) expNum = Expression.ONE;
        else if (operator) expNum = Expression.TWO;
        else expNum = Expression.ONE;

        return Promise.all([
          showResult && this.props.updateResult(_expression),
          isLastKeyEquals && this.props.updateOperator(""),
          this.props[expNum](_expression),
          this.props.setLastKey(KeyType.NEGATE),
          this.props.toggleIsDirty(true),
          this.props.toggleIsEvaluated(showResult),
          this.scrollView.scrollToEnd({ animated: false })
        ]);

      case KeyType.DECIMAL:
        _expression = this.decimal(
          isLastKeyEquals ? result : operator ? expression2 : expression1
        );

        if (isLastKeyEquals) expNum = Expression.ONE;
        else if (operator) expNum = Expression.TWO;
        else expNum = Expression.ONE;

        return Promise.all([
          isLastKeyEquals && this.props.updateResult(_expression),
          isLastKeyEquals && this.props.updateOperator(""),
          this.props[expNum](_expression),
          this.props.setLastKey(KeyType.DECIMAL),
          this.props.toggleIsDirty(true),
          this.props.toggleIsEvaluated(false),
          this.scrollView.scrollToEnd({ animated: false })
        ]);

      case KeyType.OPERAND:
        _expression = this.operand(operator ? expression2 : expression1, key);

        if (isLastKeyEquals) expNum = Expression.ONE;
        else if (operator) expNum = Expression.TWO;
        else expNum = Expression.ONE;

        return Promise.all([
          isLastKeyEquals && this.props.updateResult(0),
          isLastKeyEquals && this.props.updateOperator(""),
          this.props[expNum](_expression),
          this.props.setLastKey(key),
          this.props.toggleIsDirty(true),
          this.props.toggleIsEvaluated(false),
          this.scrollView.scrollToEnd({ animated: false })
        ]);
    }
  };

  getDisplay = () => {
    const { expression1, expression2, result, operator, lastKey } = this.props;

    // console.log(expression1);
    // console.log(expression2);
    // console.log(result);

    if (
      lastKey === KeyType.EQUALS ||
      (lastKey === KeyType.OPERATOR && result)
    ) {
      return result;
    } else {
      return operator ? expression2 : expression1;
    }
  };

  render() {
    const { orientation, history, isDirty } = this.props;

    return (
      <View style={styles.container} onLayout={this.handleLayout}>
        <CalculatorExpression
          orientation={orientation}
          expression={this.getDisplay()}
          scrollViewRef={ref => (this.scrollView = ref)}
        />
        <CalculatorExpressionHistory
          orientation={orientation}
          history={history}
          handleClear={this.handleClearHistory}
          handleHistoryPress={this.handleHistoryPress}
        />
        <CalculatorKeys
          orientation={orientation}
          isDirty={isDirty}
          handlePress={this.handlePress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#000"
  }
});

const mapStateToProps = state => ({
  expression1: selectExpression1(state),
  expression2: selectExpression2(state),
  result: selectResult(state),
  operator: selectOperator(state),
  history: selectHistory(state),
  lastKey: selectLastKey(state),
  isDirty: selectIsDirty(state),
  isEvaluated: selectIsEvaluated(state),
  orientation: selectOrientation(state)
});

const mapDispatchToProps = dispatch => ({
  setOrientation: orientation => dispatch(setOrientationAsync(orientation)),
  setLastKey: lastKey => dispatch(setLastKeyAsync(lastKey)),
  toggleIsDirty: isDirty => dispatch(toggleIsDirtyAsync(isDirty)),
  toggleIsEvaluated: isEvaluated =>
    dispatch(toggleIsEvaluatedAsync(isEvaluated)),
  updateExpression1: expression1 =>
    dispatch(updateExpression1Async(expression1)),
  updateExpression2: expression2 =>
    dispatch(updateExpression2Async(expression2)),
  updateResult: result => dispatch(updateResultAsync(result)),
  updateOperator: operator => dispatch(updateOperatorAsync(operator)),
  updateHistory: history => dispatch(updateHistoryAsync(history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
