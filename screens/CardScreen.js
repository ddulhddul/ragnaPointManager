import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import { Icon, Constants } from 'expo'
import DB from '../components/common/ragnaDB'
import CardList from '../components/card/CardList'

export default class CardScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props){
    super(props)
    this.state = {
      foldTf: false,
      cardList: DB.getCardList(),
      cardImages: DB.getCardImages()
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
          <CardList 
            foldTf={foldTf}
            cardImages={this.state.cardImages}
            cardList={this.state.cardList} />
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
