import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Icon, Constants } from 'expo'
import DB from '../components/common/ragnaDB'
import ItemList from '../components/item/ItemList'

export default class ItemScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props){
    super(props)
    this.state = {
      foldTf: false,
      itemList: DB.getItemList(),
      itemImages: DB.getItemImages()
    }
  }

  render() {
    const { foldTf } = this.state
    return (
      <View style={styles.container}>
        <View style={{height: Constants.statusBarHeight + 5, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={()=>{this.setState({foldTf: !foldTf})}} style={{marginRight: 20, marginTop: 5}}>
            <Icon.AntDesign name={foldTf? "down": "up"} size={20} color={"grey"} />
          </TouchableOpacity>
        </View>
        <View style={[styles.container, styles.contentContainer]}>
          <ItemList 
            foldTf={foldTf}
            itemImages={this.state.itemImages}
            itemList={this.state.itemList} />
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
  },
})
