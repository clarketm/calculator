import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { HistoryEntry } from "./HistoryEntry";
import { expressionToString } from "../utils/helpers";

export class CalculatorExpressionHistory extends Component {
  render() {
    const {
      history,
      orientation,
      handleClear,
      handleHistoryPress
    } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <TouchableHighlight onPress={handleClear}>
            <Text style={styles.button}>clear</Text>
          </TouchableHighlight>
        </View>

        <ScrollView horizontal contentContainerStyle={styles.scroll}>
          {history.map((historyItem, index) => {
            let item = expressionToString(historyItem);
            return (
              <HistoryEntry
                key={`${index}:${item}`}
                index={index}
                orientation={orientation}
                handlePress={handleHistoryPress}
              >
                {item}
              </HistoryEntry>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    backgroundColor: "#EE9A35"
  },
  button: {
    color: "#fff",
    fontSize: 20
  },
  scroll: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});
