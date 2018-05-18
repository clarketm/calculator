import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  render () {
    const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    return (
      <View style={{flex: 1}}>
        <View style={{backgroundColor: 'powderblue'}}>
          <Header
            centerComponent={{text: 'Calculator', style: {color: '#fff'}}}
          />
        </View>
        <View style={{flex: 1, backgroundColor: 'skyblue'}}>
          <Text>Calculation</Text>
        </View>
        <View style={{flex: 3, alignItems: 'stretch', backgroundColor: 'red'}}>
          <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
            <View style={{flex: 1, borderWidth: 1, justifyContent: 'center'}}><Button onPress={() => 'hi'} title="5" /></View>
            <View style={{flex: 1, borderWidth: 1, justifyContent: 'center'}}><Button onPress={() => 'hi'} title="5" /></View>
            <View style={{flex: 1, borderWidth: 1, justifyContent: 'center'}}><Button onPress={() => 'hi'} title="5" /></View>
            <View style={{flex: 1, borderWidth: 1, justifyContent: 'center'}}><Button onPress={() => 'hi'} title="5" /></View>
          </View>
          <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
            <View style={{flex: 1, borderWidth: 1, justifyContent: 'center'}}><Button onPress={() => 'hi'} title="5" /></View>
            <View style={{flex: 1, borderWidth: 1, justifyContent: 'center'}}><Button onPress={() => 'hi'} title="5" /></View>
            <View style={{flex: 1, borderWidth: 1, justifyContent: 'center'}}><Button onPress={() => 'hi'} title="5" /></View>
            <View style={{flex: 1, borderWidth: 1, justifyContent: 'center'}}><Button onPress={() => 'hi'} title="5" /></View>
          </View>
          <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
            <View style={{flex: 1, borderWidth: 1, justifyContent: 'center'}}><Button onPress={() => 'hi'} title="5" /></View>
            <View style={{flex: 1, borderWidth: 1, justifyContent: 'center'}}><Button onPress={() => 'hi'} title="5" /></View>
            <View style={{flex: 1, borderWidth: 1, justifyContent: 'center'}}><Button onPress={() => 'hi'} title="5" /></View>
            <View style={{flex: 1, borderWidth: 1, justifyContent: 'center'}}><Button onPress={() => 'hi'} title="5" /></View>
          </View>
          <View style={{flex: 1, justifyContent: 'space-between', flexDirection: 'row'}}>
            <View style={{flex: 1, borderWidth: 1, justifyContent: 'center'}}><Button onPress={() => 'hi'} title="5" /></View>
            <View style={{flex: 1, borderWidth: 1, justifyContent: 'center'}}><Button onPress={() => 'hi'} title="5" /></View>
            <View style={{flex: 1, borderWidth: 1, justifyContent: 'center'}}><Button onPress={() => 'hi'} title="5" /></View>
            <View style={{flex: 1, borderWidth: 1, justifyContent: 'center'}}><Button onPress={() => 'hi'} title="5" /></View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
