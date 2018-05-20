import React from 'react';
import { StyleSheet, View } from 'react-native';

export class CalculatorHeader extends React.Component {
  render () {
    return (
      <View style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    backgroundColor: '#000'
  },
  header: {color: '#fff'}
});
