import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

import DB from '../components/common/ragnaDB'
import ItemList from '../components/item/ItemList'

export default class ItemScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props){
    super(props)
    this.state = {
      itemList: DB.getItemList()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={[styles.container, styles.contentContainer]}>
          <ItemList itemList={this.state.itemList} />
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
