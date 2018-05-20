import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export class CalculatorExpression extends Component {
  render() {
    const { expression, scrollViewRef } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scroll}
          ref={scrollViewRef}
        >
          <Text style={styles.text}>{expression}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#000"
  },
  scroll: {
    padding: 15
    // paddingLeft: 40,
    // paddingRight: 40,
    // alignItems: 'flex-end',
    // justifyContent: 'flex-end',
  },
  text: {
    fontSize: 70,
    // padding: 15,
    fontWeight: "200",
    color: "#fff"
  }
});
