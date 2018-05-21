import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { CalculatorKey } from "./CalculatorKey";
import { Keys } from "../utils/constants";

export class CalculatorKeys extends Component {
  render() {
    const { handlePress, isDirty, orientation } = this.props;

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
                    textDirty={key.textDirty || key.text}
                    type={key.type}
                    color={key.color}
                    style={key.style}
                    isDirty={isDirty}
                    handlePress={handlePress}
                    orientation={orientation}
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
    paddingTop: 5,
    alignItems: "stretch",
    backgroundColor: "#000"
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row"
  }
});
