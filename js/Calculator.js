import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CalculatorKeys } from './components/CalculatorKeys';
import { CalculatorHeader } from './components/CalculatorHeader';
import { CalculatorExpression } from './components/CalculatorExpression';
import { CalculatorExpressionHistory } from './components/CalculatorExpressionHistory';
import { KeyType } from './constants';

export class Calculator extends React.Component {

  state = {
    expression: '0',
    expressionStack: [],
    history: []
  };

  clearHistory = () => {
    this.setState({
      history: []
    })
  };

  operator = (expression, key) => {
    if (expression.length > 0 && expression[expression.length - 1].match(/[\+\-\÷\×]/)) {
      return `${expression.slice(0, -1)}${key}`;
    } else {
      return `${expression}${key}`;
    }
  };

  operand = (expression, key) => {
    if (Number.parseInt(expression, 10) === 0 && expression.length === 1) {
      return key;
    } else {
      return `${expression}${key}`;
    }
  };

  clear = () => {
    return '0';
  };

  equals = (expression) => {
    let _expression = expression.replace('÷', '/').replace('×', '*');
    this.setState(({history}) => {
      history.push(_expression);
      return {history};
    });
    return Number.parseInt(eval(_expression), 10);
  };

  percent = (expression) => {
    return Number.parseInt(expression, 10) / 100;
  };

  negate = (expression) => {
    return Number.parseInt(expression, 10) * -1;
  };

  decimal = (expression) => {
    if (expression.includes('.')) {
      return expression;
    } else {
      return `${expression}.`;
    }
  };

  handlePress = (key, type) => {
    let {expression} = this.state;
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

    this.setState({
      expression: _expression
    });
  };

  render () {
    const {expression, history} = this.state;

    return (
      <View style={styles.container}>
        <CalculatorHeader />
        <CalculatorExpression expression={expression} />
        <CalculatorExpressionHistory history={history} handlePress={this.clearHistory} />
        <CalculatorKeys handlePress={this.handlePress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
