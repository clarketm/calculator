import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export class CalculatorExpressionHistory extends Component {
  render () {
    const {history, handlePress} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.button}>
          <Button
            onPress={handlePress}
            title="Clear"
          />
        </View>

        <View style={styles.historyContainer}>
          {history.map(h => {
            return (
              <Text key={h} style={styles.text}>{h}</Text>
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
  text: {
    fontSize: 15,
    padding: 5,
    marginRight: 10,
    borderRadius: 60,
    fontWeight: '200',
    color: '#fff',
    backgroundColor: '#b77628'
  },
});
