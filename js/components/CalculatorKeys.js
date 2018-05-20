import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { CalculatorKey } from './CalculatorKey';
import { Keys } from '../constants';

export class CalculatorKeys extends Component {

  render () {
    const {handlePress} = this.props;

    return (
      <View style={styles.container}>
        {Keys.map((row, i) => {
          return (
            <View key={i} style={styles.row}>
              {row.map(key => {
                return (
                  <CalculatorKey
                    key={key.text}
                    text={key.text}
                    type={key.type}
                    color={key.color}
                    handlePress={handlePress}
                  />
                );
              })}
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    alignItems: 'stretch',
    backgroundColor: '#000'
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});
