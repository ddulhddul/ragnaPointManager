import React, { Component } from 'react'
import {
  StyleSheet, View, WebView,
  TouchableOpacity
} from 'react-native'
import { Icon, Constants } from 'expo'
import Util from '../components/common/Util'

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
        <View style={{height: Constants.statusBarHeight + 5}}>
        </View>
        <WebView
          source={{uri: this.state.url}}
          ref={c => this._webview = c}
          javaScriptEnabled={true}
          injectedJavaScript={`document.querySelectorAll('.topslideAd,#mobileTailAd_Layer,#mobileTailAd_LayerDummy,#mobileTailAd').forEach((obj)=>obj.remove())`}
          // document.querySelectorAll('.topslideAd,#mobileTailAd_Layer').forEach((obj)=>obj.remove())
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity style={[styles.webControlIconStyle, {}]} 
            onPress={()=>{this._webview.goBack()}}>
            <View><Icon.AntDesign name="caretleft" size={20} color={Util.tabColor} /></View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.webControlIconStyle, {}]} 
            onPress={()=>{this.setState({url: 'http://rom.inven.co.kr/'})}}>
            <View><Icon.Entypo name="home" size={20} color={Util.tabColor} /></View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.webControlIconStyle, {}]} 
            onPress={()=>{this.setState({url: 'https://cafe.naver.com/ragnarokmmorpg'})}}>
            <View><Icon.Ionicons name="ios-cafe" size={20} color={Util.tabColor} /></View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.webControlIconStyle, {}]} 
            onPress={()=>{this._webview.goForward()}}>
            <View><Icon.AntDesign name="caretright" size={20} color={Util.tabColor} /></View>
          </TouchableOpacity>
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
  iconContainer: {
    // paddingLeft: 30,
    // paddingRight: 30,
    height: 40, 
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    alignItems: 'center'
  },
  webControlIconStyle: {
    // position:'absolute', 
    // bottom: 10, 
    // zIndex: 999, 
    // elevation: 5, 
    padding: 5,
    // borderRadius: 20,
    // backgroundColor: 'rgb(243, 156, 18)'
  },
})
