import React from 'react'
import { 
  ScrollView, View, Text, StyleSheet, Alert,
  TextInput, TouchableOpacity
} from 'react-native'
import { Icon } from 'expo'
import CommonStyles from '../components/common/style'
import { withNavigation } from 'react-navigation'
import SqlUtil from '../components/common/SqlUtil'
import Util from '../components/common/Util'
import DB from '../components/common/ragnaDB'

class SettingsScreen extends SqlUtil {
  static navigationOptions = {
    header: null,
  }

  constructor(props){
    super(props)
    this.state = {
      itemIngredients: [],
      itemIngredientPriceData: DB.getItemIngredientPriceData()
    }
  }

  componentDidMount(){
    const { navigation } = this.props
    this.focusListener = navigation.addListener("didFocus", async () => {
        this.isReady = false
        const itemIngredients = await this.getTnIngredient()
        this.isReady = true
        this.setState({
          itemIngredients
        })
    })
  }

  componentWillUnmount(){
    this.focusListener && this.focusListener.remove()
  }

  saveIngre = async(obj={})=>{
    const dbObj = await this.selectIngredientByName(obj)
    if(dbObj) await this.updateIngredient(obj)
    else await this.insertIngredient(obj)

    this.isReady = false
    const itemIngredients = await this.getTnIngredient()
    this.isReady = true
    this.setState({
      itemIngredients
    })
  }

  resetCustomPrice(){
    Alert.alert(
      '경고',
      `${this.state.itemIngredientPriceData.replace(/.{2}(.{2})(.{2})(.{2})/,'$1.$2.$3')} 기준으로 아이템 가격 데이터를 초기화 하시겠습니까?`,
      [{text: '확인', onPress: ()=>{this.proceedReset()}}, {text: '취소'}]
    )
  }

  proceedReset= async()=>{
    await this.initIngredientTable(true)
    Util.toast('초기화 되었습니다.')

    this.isReady = false
    const itemIngredients = await this.getTnIngredient()
    this.isReady = true
    this.setState({itemIngredients})
  }

  render() {
    const { scrolling, itemIngredientPriceData='', itemIngredients={} } = this.state
    const itemIngredientsList = Array.from(Object.keys(itemIngredients)).map((key)=>{
      return itemIngredients[key]
    })
    return (
      <View style={[styles.container, styles.thisContainer]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <Text style={styles.title}>아이템 가격</Text>
          <View>
            <View style={[styles.filterStyle, {backgroundColor: Util.green}]}>
              <TouchableOpacity onPress={()=>{this.resetCustomPrice()}}>
                <Text style={[styles.filterTextStyle, {textAlign: 'center'}]}>초기화</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.dateFontStyle}>{itemIngredientPriceData.replace(/.{2}(.{2})(.{2})(.{2})/,'$1.$2.$3')}</Text>
          </View>
        </View>
        <ScrollView ref={(ref)=>{this.list=ref}} style={styles.scrollViewStyle}
          onScroll={(event)=>{
            if(event.nativeEvent.contentOffset.y >= 5) this.setState({scrolling: true})
            else this.setState({scrolling: false})
          }}>
          <View style={[styles.trContainer, {padding: 10, backgroundColor: Util.tabColor}]}>
            <Text style={{fontSize: 14, color:'white', fontWeight:'bold'}}>아이템 이름</Text>
            <View style={{flex:1, alignItems: 'flex-end'}}>
              <Text style={{fontSize: 14, color:'white', fontWeight:'bold'}}>가격 (Zenny)</Text>
            </View> 
          </View>
          {
            itemIngredientsList.map((ingreObj, ingreIndex)=>{
              return (
                <View style={[styles.trContainer, {margin: 10}]} key={`ingre_${ingreIndex}`}>
                  <Text style={{fontSize: 14}}>{ingreObj.displayName}</Text>
                  <View style={[styles.tdContainer, {flex:1, alignItems: 'flex-end'}]}>
                    <TextInput keyboardType={"numeric"}
                      style={{flex:1}}
                      value={Util.comma(String(ingreObj.price || 0))}
                      onBlur={()=>this.saveIngre(ingreObj)}
                      onChangeText={(value)=>{
                        let obj = {...itemIngredients}
                        obj[ingreObj.name].price = Number(String(value || '').replace(/[^0-9]/g,''))
                        this.setState({
                          itemIngredients: obj
                        })
                      }}
                    />
                  </View>
                </View>
              )
            })
          }
          <View style={{height: 50}}></View>
        </ScrollView>
        {
          !scrolling? null:
          <TouchableOpacity style={styles.scrollUpIconStyle} onPress={()=>{this.list.scrollTo({x: 0, y: 0, animated: true})}}>
            <View>
              <Icon.AntDesign name="caretup" size={20} color='white' />
            </View>
          </TouchableOpacity>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  ...CommonStyles.commonStyles,
  thisContainer: {
    margin: 10
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 5
  },
  dateFontStyle: {
    fontSize: 13,
    marginBottom: 5
  },
  scrollViewStyle: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: 'grey',
    paddingLeft: 20,
    paddingRight: 20,
  }
})

export default withNavigation(SettingsScreen)