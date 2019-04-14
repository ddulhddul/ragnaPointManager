import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

import DB from '../components/common/ragnaDB'
import FoodList from '../components/food/FoodList'

export default class FoodScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props){
    super(props)
    this.state = {
      foodList: DB.getFoodList()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={[styles.container, styles.contentContainer]}>
          <FoodList foodList={this.state.foodList} />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 25,
  },
})
