import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { CalculatorKeys } from "../components/CalculatorKeys";
import { CalculatorHeader } from "../components/CalculatorHeader";
import { CalculatorExpression } from "../components/CalculatorExpression";
import { CalculatorExpressionHistory } from "../components/CalculatorExpressionHistory";
import { KeyType } from "../utils/constants";
import { stringToExpression } from "../utils/helpers";
import { selectExpression, selectHistory } from "../api/global/globalSelectors";
import {
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
    if (Number.parseInt(expression, 10) === 0 && expression.length === 1) {
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
    return (Number.parseInt(expression, 10) / 100).toString();
  };

  negate = expression => {
    return (Number.parseInt(expression, 10) * -1).toString();
  };

  decimal = expression => {
    if (expression.includes(".")) {
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
    let _expression;

    switch (type) {
      case KeyType.CLEAR:
        _expression = this.clear();
        break;
      case KeyType.EQUALS:
        _expression = this.equals(expression);
        break;
      case KeyType.PERCENT:
        _expression = this.percent(expression);
        break;
      case KeyType.NEGATE:
        _expression = this.negate(expression);
        break;
      case KeyType.DECIMAL:
        _expression = this.decimal(expression);
        break;
      case KeyType.OPERATOR:
        _expression = this.operator(expression, key);
        break;
      case KeyType.OPERAND:
        _expression = this.operand(expression, key);
        break;
    }

    this.props
      .updateExpression(_expression)
      .then(() => this.scrollView.scrollToEnd({ animated: false }));
  };

  render() {
    const { expression, history } = this.props;

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
        <CalculatorKeys handlePress={this.handlePress} />
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
  history: selectHistory(state)
});

const mapDispatchToProps = dispatch => ({
  updateExpression: expression => dispatch(updateExpressionAsync(expression)),
  updateHistory: history => dispatch(updateHistoryAsync(history))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
