import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { dynamicFontSize } from "../utils/helpers";

export class CalculatorExpression extends Component {
  render() {
    const { orientation, expression, scrollViewRef } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView horizontal contentContainerStyle={styles.scroll} ref={scrollViewRef}>
          <Text style={[styles.text, dynamicFontSize(orientation, 70)]}>
            {expression}
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2.2,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "#000"
  },
  scroll: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 15
  },
  text: {
    fontWeight: "200",
    color: "#fff"
  }
});
