import React, { Component } from "react";
import { Button, StyleSheet, View } from "react-native";
import { HistoryEntry } from "./HistoryEntry";
import { expressionToString } from "../utils/helpers";

export class CalculatorExpressionHistory extends Component {
  render() {
    const { history, handleClear, handleHistoryPress } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <Button color="#fff" onPress={handleClear} title="clear" />
        </View>

        <View style={styles.historyContainer}>
          {history.map((historyItem, index) => {
            let item = expressionToString(historyItem);
            return (
              <HistoryEntry
                key={`${index}:${item}`}
                index={index}
                handlePress={handleHistoryPress}
              >
                {item}
              </HistoryEntry>
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
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#EE9A35"
  },
  historyContainer: {
    flexDirection: "row"
  }
});
