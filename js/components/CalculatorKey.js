import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

export class CalculatorKey extends Component {
  render () {
    const {color, text, type,  handlePress} = this.props;

    return (
      <TouchableHighlight style={[styles.container, {backgroundColor: color}]} onPress={() => handlePress(text, type)}>
        <Text style={styles.key}>{text}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    margin: 5
  },
  key: {
    fontSize: 40,
    color: 'white'
  }
});
