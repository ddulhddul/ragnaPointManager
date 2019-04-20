import React, { Component } from 'react'
import {
  StyleSheet, View, WebView,
  TouchableOpacity
} from 'react-native'
import { Icon } from 'expo'

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
        <TouchableOpacity style={[styles.webControlIconStyle, {left: 10}]} 
          onPress={()=>{this._webview.goBack()}}>
          <View><Icon.AntDesign name="caretleft" size={20} color='white' /></View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.webControlIconStyle, {right: 10}]} 
          onPress={()=>{this._webview.goForward()}}>
          <View><Icon.AntDesign name="caretright" size={20} color='white' /></View>
        </TouchableOpacity>
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
  webControlIconStyle: {
    position:'absolute', 
    bottom: 10, 
    zIndex: 999, 
    elevation: 5, 
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgb(243, 156, 18)'
  },
})
