import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { CalculatorKeys } from "../components/CalculatorKeys";
import { CalculatorHeader } from "../components/CalculatorHeader";
import { CalculatorExpression } from "../components/CalculatorExpression";
import { CalculatorExpressionHistory } from "../components/CalculatorExpressionHistory";
import { KeyType } from "../utils/constants";
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
  selectOperator
} from "../api/global/globalSelectors";
import {
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

  clear = () => {
    return Promise.all([
      this.props.updateOperator(null),
      this.props.updateExpression1("0"),
      this.props.updateExpression2("0"),
      this.props.toggleIsEvaluated(false)
    ]);
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

  handleClearHistory = () => {
    this.props.updateHistory(this.props.history.clear());
  };

  handleHistoryPress = (expression, index) => {
    this.props.updateExpression1(eval(stringToExpression(expression)));
    this.props.updateHistory(this.props.history.splice(index, 1));
  };

  handlePress = (key, type) => {
    let {
      expression1,
      expression2,
      operator,
      history,
      isEvaluated
    } = this.props;
    let expNum, _expression;

    console.log(isEvaluated);

    switch (type) {
      case KeyType.CLEAR:
        return this.clear();
      case KeyType.OPERATOR:
        return Promise.all([
          this.props.updateOperator(key),
          this.props.toggleIsEvaluated(false),
          this.scrollView.scrollToEnd({ animated: false })
        ]);
      case KeyType.EQUALS:
        if (expression2 === "0" && !operator) return;

        let fullExp = `${expression1}${operator}${expression2}`;

        let _expression = truncateByEvaluation(
          eval(stringToExpression(fullExp))
        );
        return Promise.all([
          this.props.updateOperator(null),
          this.props.updateExpression1(_expression),
          this.props.updateExpression2("0"),
          this.props.toggleIsEvaluated(true),
          this.scrollView.scrollToEnd({ animated: false }),
          this.props.updateHistory(history.push(fullExp))
        ]);
      case KeyType.PERCENT:
        _expression = this.percent(operator ? expression2 : expression1);
        if (operator) expNum = "updateExpression2";
        else expNum = "updateExpression1";
        return Promise.all([
          this.props[expNum](_expression),
          this.props.toggleIsEvaluated(false),
          this.scrollView.scrollToEnd({ animated: false })
        ]);
      case KeyType.NEGATE:
        _expression = this.negate(operator ? expression2 : expression1);
        if (operator) expNum = "updateExpression2";
        else expNum = "updateExpression1";
        return Promise.all([
          this.props[expNum](_expression),
          this.props.toggleIsEvaluated(false),
          this.scrollView.scrollToEnd({ animated: false })
        ]);
      case KeyType.DECIMAL:
        _expression = this.decimal(operator ? expression2 : expression1);
        if (operator) expNum = "updateExpression2";
        else expNum = "updateExpression1";
        return Promise.all([
          this.props[expNum](_expression),
          this.props.toggleIsEvaluated(false),
          this.scrollView.scrollToEnd({ animated: false })
        ]);
      case KeyType.OPERAND:
        _expression = this.operand(operator ? expression2 : expression1, key);
        if (operator) expNum = "updateExpression2";
        else expNum = "updateExpression1";
        return Promise.all([
          this.props[expNum](_expression),
          this.props.toggleIsEvaluated(false),
          this.scrollView.scrollToEnd({ animated: false })
        ]);
    }

    // .then(() => this.scrollView.scrollToEnd({animated: false}));
  };

  render() {
    const { expression1, expression2, operator, history, isDirty } = this.props;

    return (
      <View style={styles.container}>
        <CalculatorHeader />
        <CalculatorExpression
          expression={operator ? expression2 : expression1}
          scrollViewRef={ref => (this.scrollView = ref)}
        />
        <CalculatorExpressionHistory
          history={history}
          handleClear={this.handleClearHistory}
          handleHistoryPress={this.handleHistoryPress}
        />
        <CalculatorKeys isDirty={isDirty} handlePress={this.handlePress} />
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
  isEvaluated: selectIsEvaluated(state)
});

const mapDispatchToProps = dispatch => ({
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
