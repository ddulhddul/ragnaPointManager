import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

import DB from '../components/common/ragnaDB'
import CardList from '../components/card/CardList'

export default class CardScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props){
    super(props)
    this.state = {
      cardList: DB.getCardList(),
      cardImages: DB.getCardImages()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View style={[styles.container, styles.contentContainer]}>
          <CardList 
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
    paddingTop: 25,
  },
})
