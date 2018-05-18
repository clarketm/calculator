import React from 'react';
import { StyleSheet, Button, Text } from 'react-native';

export default class CalculatorButton extends React.Component {

  handlePress = (event) => {
    console.log('pressed', event);
  };

  render () {
    const {props} = this;
    return (
      <Button onPress={this.handlePress} {...props} />
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: '#474747',
  },
});
