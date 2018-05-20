import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HistoryEntry } from './HistoryEntry';
import { expressionToString } from '../constants';

export class CalculatorExpressionHistory extends Component {
  render () {
    const {history, handleClear, handleHistoryPress} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button
            onPress={handleClear}
            title="clear"
          />
        </View>


        <View style={styles.historyContainer}>
          {history.map((historyItem, index) => {
            let item = expressionToString(historyItem);
            return (
              <HistoryEntry key={item} index={index} handlePress={handleHistoryPress}>{item}</HistoryEntry>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#EE9A35',
  },
  button: {
  },
  historyContainer: {
    flexDirection: 'row',
  },
});
