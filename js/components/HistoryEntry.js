import React, { Component } from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import { dynamicFontSize } from "../utils/helpers";

export class HistoryEntry extends Component {
  render() {
    const { children, orientation, index, handlePress } = this.props;

    return (
      <TouchableHighlight
        style={styles.container}
        onPress={() => handlePress(children, index)}
      >
        <Text style={[styles.historyItem, dynamicFontSize(orientation, 15)]}>
          {children}
        </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10
  },
  historyItem: {
    padding: 5,
    borderRadius: 60,
    fontWeight: "200",
    color: "#fff",
    backgroundColor: "#b77628"
  }
});
