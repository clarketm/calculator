import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export class CalculatorExpression extends Component {
  render () {
    const {expression} = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{expression}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#000'
  },
  text: {
    fontSize: 70,
    fontWeight: "200",
    color: '#fff'
  }
});
