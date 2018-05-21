import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { CalculatorKeys } from "../components/CalculatorKeys";
import { CalculatorHeader } from "../components/CalculatorHeader";
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
  selectOperator,
  selectOrientation
} from "../api/global/globalSelectors";
import {
  setOrientationAsync,
  toggleIsDirtyAsync,
  toggleIsEvaluatedAsync,
  updateExpression1Async,
  updateExpression2Async,
  updateHistoryAsync,
  updateOperatorAsync
} from "../api/global/globalActions";

class Calculator extends Component {
  operand = (expression, key) => {
    if (this.props.isEvaluated || isZero(expression)) {
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
    if (this.props.isEvaluated) {
      return "0.";
    } else if (expression.includes(".")) {
      return `${expression}`;
    } else {
      return `${expression}.`;
    }
  };

  handleLayout = ({ width, height }) => {
    const _orientation =
      width > height ? Orientation.LANDSCAPE : Orientation.PORTRAIT;
    this.props.setOrientation(_orientation);
  };

  handleClearHistory = () => {
    this.props.updateHistory(this.props.history.clear());
  };

  handleHistoryPress = (expression, index) => {
    this.props.updateExpression1(eval(stringToExpression(expression))); // eslint-disable-line
    this.props.updateHistory(this.props.history.splice(index, 1));
  };

  handlePress = (key, type) => {
    let { expression1, expression2, operator, history } = this.props;
    let expNum, _expression;

    switch (type) {
      case KeyType.CLEAR:
        return Promise.all([
          this.props.updateOperator(null),
          this.props.updateExpression1("0"),
          this.props.updateExpression2("0"),
          this.props.toggleIsDirty(false),
          this.props.toggleIsEvaluated(false),
          this.scrollView.scrollToEnd({ animated: false })
        ]);
      case KeyType.OPERATOR:
        return Promise.all([
          this.props.updateOperator(key),
          this.props.toggleIsDirty(true),
          this.props.toggleIsEvaluated(false),
          this.scrollView.scrollToEnd({ animated: false })
        ]);
      case KeyType.EQUALS:
        if (!operator) return;

        let fullExp = `${expression1}${operator}${expression2}`;
        _expression = this.equal(fullExp);

        return Promise.all([
          this.props.updateOperator(null),
          this.props.updateExpression1(_expression),
          this.props.updateExpression2("0"),
          this.props.toggleIsDirty(true),
          this.props.toggleIsEvaluated(true),
          this.props.updateHistory(history.push(fullExp)),
          this.scrollView.scrollToEnd({ animated: false })
        ]);
      case KeyType.PERCENT:
        _expression = this.percent(operator ? expression2 : expression1);
        if (operator) expNum = Expression.TWO;
        else expNum = Expression.ONE;
        return Promise.all([
          this.props[expNum](_expression),
          this.props.toggleIsDirty(true),
          this.props.toggleIsEvaluated(false),
          this.scrollView.scrollToEnd({ animated: false })
        ]);
      case KeyType.NEGATE:
        _expression = this.negate(operator ? expression2 : expression1);
        if (operator) expNum = Expression.TWO;
        else expNum = Expression.ONE;
        return Promise.all([
          this.props[expNum](_expression),
          this.props.toggleIsDirty(true),
          this.props.toggleIsEvaluated(false),
          this.scrollView.scrollToEnd({ animated: false })
        ]);
      case KeyType.DECIMAL:
        _expression = this.decimal(operator ? expression2 : expression1);
        if (operator) expNum = Expression.TWO;
        else expNum = Expression.ONE;
        return Promise.all([
          this.props[expNum](_expression),
          this.props.toggleIsDirty(true),
          this.props.toggleIsEvaluated(false),
          this.scrollView.scrollToEnd({ animated: false })
        ]);
      case KeyType.OPERAND:
        _expression = this.operand(operator ? expression2 : expression1, key);
        if (operator) expNum = Expression.TWO;
        else expNum = Expression.ONE;
        return Promise.all([
          this.props[expNum](_expression),
          this.props.toggleIsDirty(true),
          this.props.toggleIsEvaluated(false),
          this.scrollView.scrollToEnd({ animated: false })
        ]);
    }
  };

  render() {
    const {
      expression1,
      expression2,
      orientation,
      operator,
      history,
      isDirty
    } = this.props;

    return (
      <View style={styles.container} onLayout={this.handleLayout}>
        <CalculatorHeader />
        <CalculatorExpression
          orientation={orientation}
          expression={operator ? expression2 : expression1}
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
    flex: 1
  }
});

const mapStateToProps = state => ({
  expression1: selectExpression1(state),
  expression2: selectExpression2(state),
  operator: selectOperator(state),
  history: selectHistory(state),
  isDirty: selectIsDirty(state),
  isEvaluated: selectIsEvaluated(state),
  orientation: selectOrientation(state)
});

const mapDispatchToProps = dispatch => ({
  setOrientation: orientation => dispatch(setOrientationAsync(orientation)),
  toggleIsDirty: isDirty => dispatch(toggleIsDirtyAsync(isDirty)),
  toggleIsEvaluated: isEvaluated =>
    dispatch(toggleIsEvaluatedAsync(isEvaluated)),
  updateExpression1: expression1 =>
    dispatch(updateExpression1Async(expression1)),
  updateExpression2: expression2 =>
    dispatch(updateExpression2Async(expression2)),
  updateOperator: operator => dispatch(updateOperatorAsync(operator)),
  updateHistory: history => dispatch(updateHistoryAsync(history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
