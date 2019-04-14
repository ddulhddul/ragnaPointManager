import React, { Component } from 'react'
import {
  StyleSheet, View, WebView
} from 'react-native'

export default class WebScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props){
    super(props)
    this.state = {
      url: 'http://rom.inven.co.kr/'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
          source={{uri: this.state.url}}
          ref={c => this._webview = c}
          javaScriptEnabled={true}
          injectedJavaScript={`document.querySelectorAll('.topslideAd,#mobileTailAd_Layer').forEach((obj)=>obj.remove())`}
          // document.querySelectorAll('.topslideAd,#mobileTailAd_Layer').forEach((obj)=>obj.remove())
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 25,
  },
})
