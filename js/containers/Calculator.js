import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { CalculatorKeys } from "../components/CalculatorKeys";
import { CalculatorHeader } from "../components/CalculatorHeader";
import { CalculatorExpression } from "../components/CalculatorExpression";
import { CalculatorExpressionHistory } from "../components/CalculatorExpressionHistory";
import { KeyType } from "../utils/constants";
import { stringToExpression } from "../utils/helpers";
import {
  selectExpression,
  selectHistory,
  selectIsDirty,
  selectIsEvaluated
} from "../api/global/globalSelectors";
import {
  toggleIsDirtyAsync,
  toggleIsEvaluatedAsync,
  updateExpressionAsync,
  updateHistoryAsync
} from "../api/global/globalActions";

class Calculator extends React.Component {
  operator = (expression, key) => {
    if (
      expression.length > 0 &&
      expression[expression.length - 1].match(/[+\-÷×]/)
    ) {
      return `${expression.slice(0, -1)}${key}`;
    } else {
      return `${expression}${key}`;
    }
  };

  operand = (expression, key) => {
    if (this.props.isEvaluated) {
      return key.toString();
    } else if (
      Number.parseInt(expression, 10) === 0 &&
      expression.length === 1
    ) {
      return key.toString();
    } else {
      return `${expression}${key}`;
    }
  };

  clear = () => {
    return "0";
  };

  equals = expression => {
    if (
      expression.length > 0 &&
      expression[expression.length - 1].match(/[+\-÷×]/)
    ) {
      return expression.toString();
    } else if (expression.length > 0 && !expression.match(/[+\-÷×]/)) {
      return expression.toString();
    }

    let _expression = stringToExpression(expression);

    this.props.updateHistory(this.props.history.push(_expression));

    let result = eval(_expression); // eslint-disable-line

    if (Number.isInteger(result)) {
      return Number.parseInt(result, 10).toString();
    } else {
      result = Number.parseFloat(result).toString();
      if (result.length > 8) {
        return result.slice(0, 8);
      } else {
        return result;
      }
    }
  };

  percent = expression => {
    if (Number.isInteger(expression / 100)) {
      return Number.parseInt(expression / 100, 10).toString();
    } else {
      let result = Number.parseFloat(expression / 100).toString();
      if (result.length > 8) {
        return result.slice(0, 8);
      } else {
        return result;
      }
    }
  };

  negate = expression => {
    if (Number.isInteger(expression * -1)) {
      return Number.parseInt(expression * -1, 10).toString();
    } else {
      let result = Number.parseFloat(expression * -1).toString();
      if (result.length > 8) {
        return result.slice(0, 8);
      } else {
        return result;
      }
    }
  };

  decimal = expression => {
    if (this.props.isEvaluated) {
      return "0.";
    } else if (expression.includes(".")) {
      return expression.toString();
    } else {
      return `${expression}.`;
    }
  };

  handleClearHistory = () => {
    this.props.updateHistory(this.props.history.clear());
  };

  handleHistoryPress = (expression, index) => {
    this.props.updateExpression(expression.toString());
    this.props.updateHistory(this.props.history.splice(index, 1));
  };

  handlePress = (key, type) => {
    let { expression } = this.props;
    let _expression, isDirty, isEvaluated;

    switch (type) {
      case KeyType.CLEAR:
        isDirty = false;
        isEvaluated = false;
        _expression = this.clear();
        break;
      case KeyType.EQUALS:
        isDirty = true;
        isEvaluated = true;
        _expression = this.equals(expression);
        break;
      case KeyType.PERCENT:
        isDirty = true;
        isEvaluated = true;
        _expression = this.percent(expression);
        break;
      case KeyType.NEGATE:
        isDirty = true;
        isEvaluated = true;
        _expression = this.negate(expression);
        break;
      case KeyType.DECIMAL:
        isDirty = true;
        isEvaluated = true;
        _expression = this.decimal(expression);
        break;
      case KeyType.OPERATOR:
        isDirty = true;
        isEvaluated = false;
        _expression = this.operator(expression, key);
        break;
      case KeyType.OPERAND:
        isDirty = true;
        isEvaluated = false;
        _expression = this.operand(expression, key);
        break;
    }

    this.props
      .updateExpression(_expression)
      .then(() => this.props.toggleIsDirty(isDirty))
      .then(() => this.props.toggleIsEvaluated(isEvaluated))
      .then(() => this.scrollView.scrollToEnd({ animated: false }));
  };

  render() {
    const { expression, history, isDirty } = this.props;

    return (
      <View style={styles.container}>
        <CalculatorHeader />
        <CalculatorExpression
          expression={expression}
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
  expression: selectExpression(state),
  history: selectHistory(state),
  isDirty: selectIsDirty(state),
  isEvaluated: selectIsEvaluated(state)
});

const mapDispatchToProps = dispatch => ({
  toggleIsDirty: isDirty => dispatch(toggleIsDirtyAsync(isDirty)),
  toggleIsEvaluated: isEvaluated =>
    dispatch(toggleIsEvaluatedAsync(isEvaluated)),
  updateExpression: expression => dispatch(updateExpressionAsync(expression)),
  updateHistory: history => dispatch(updateHistoryAsync(history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
