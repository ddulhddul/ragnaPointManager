import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

class NoData extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.8, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ position: 'relative', top: 10, flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={{ color: 'rgb(190, 190, 190)', fontSize: 25 }}>없</Text>
            <Text style={{ color: 'rgb(190, 190, 190)', fontSize: 20 }}>네</Text>
            <Text style={{ color: 'rgb(190, 190, 190)', fontSize: 15 }}>요</Text>
            <Text style={{ color: 'rgb(190, 190, 190)', fontSize: 10 }}>...</Text>
          </View>
        </View>
        <View style={{ flex: 0.2 }}></View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default NoData