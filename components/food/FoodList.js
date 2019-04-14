import React, { Component } from 'react'
import { 
    CheckBox, ScrollView, View, Text, StyleSheet,
    TextInput, Picker, Image, FlatList, TouchableOpacity
} from 'react-native'
import SqlUtil from '../common/SqlUtil'
import { withNavigation } from 'react-navigation'
import Util from '../common/Util'
import Loading from '../common/Loading'
import { Icon } from 'expo'
const saveColor= 'rgb(230, 126, 34)'
const openColor= 'rgb(41, 128, 185)'

class FoodList extends SqlUtil {
    
    constructor(props){
        super(props)
        this.state = {
            foodList: []
        }
    }

    componentDidMount(){
        const { navigation } = this.props
        this.focusListener = navigation.addListener("didFocus", async () => {
            this.isReady = false
            const foodList = await this.searchFoodList()
            this.isReady = true
            this.setState({
                foodList: foodList
            })
        })
    }

    searchFoodList= async () => {
        const savedList = (await this.listTnFood()) || []
        return this.props.foodList.map((obj)=>{
            const saved = savedList.find((saved)=>{
                return saved.name == obj.name
            }) || {}
            return {
                ...obj,
                cookingYn: saved.cookingYn || 'N',
                tastingYn: saved.tastingYn || 'N',
            }
        })
    }
    
    componentWillUnmount(){
        this.focusListener && this.focusListener.remove()
    }

    executeUpdateFood = async (obj) => {
        this.isReady = false
        const dbObj = await this.selectFoodByName(obj)
        if(dbObj) await this.updateFood(obj)
        else await this.insertFood(obj)

        this.isReady = true
        Util.toast(obj.message)
        this.setState({
            foodList: await this.searchFoodList()
        })
    }

    updateCookingChecked(param){
        this.executeUpdateFood({
            ...param,
            cookingYn: param.cookingYn=='Y'? 'N': 'Y',
            message: param.cookingYn=='Y'? `${param.name} 쿠킹완료 취소`: `${param.name} 쿠킹완료`
        })
    }
    
    updateTastingChecked(param){
        this.executeUpdateFood({
            ...param,
            tastingYn: param.tastingYn=='Y'? 'N': 'Y',
            message: param.tastingYn=='Y'? `${param.name} 맛보기완료 취소`: `${param.name} 맛보기완료`
        })
    }
    
    render() {
        const { scrolling, foodList } = this.state
        
        return (
            <View style={styles.container}>
                {(!this.isReady)? <Loading />:null}

                {
                    !foodList.length? null:
                    <View style={{alignItems: 'flex-end', marginRight: 10}}>
                        <Text style={{fontSize: 8}}>Total {Util.comma(foodList.length || 0)}</Text>
                    </View>
                }
                {
                    !scrolling? null:
                    <TouchableOpacity style={styles.scrollUpIconStyle} onPress={()=>{this.list.scrollToIndex({index:0})}}>
                        <View>
                            <Icon.AntDesign name="caretup" size={20} color='white' />
                        </View>
                    </TouchableOpacity>
                }
                <View style={{flex:1, flexDirection: 'row', margin: 10}}>
                    <View style={{flex:1}}>
                        <FlatList style={styles.scrollContainer} 
                            onScroll={(event)=>{
                                if(event.nativeEvent.contentOffset.y >= 5) this.setState({scrolling: true})
                                else this.setState({scrolling: false})
                            }}
                            ref={(ref)=>{this.list=ref}}
                            data={foodList}
                            keyExtractor={(item) => item.name}
                            renderItem={({item, index}) => {
                                return <View style={styles.componentContainer} key={`item_${encodeURI(item.name)}_${index}`}>
                                    <View style={[styles.trContainer]}>
                                        <View style={[styles.tdContainer, {marginLeft: 10, marginRight: 10}]}>
                                            <View style={[styles.trContainer, {marginBottom: 3, alignSelf: 'flex-start'}]}>
                                                <View style={{flex:1}}>
                                                    <Text style={[styles.textStyle, {fontSize: 11, color: Util.grey, textAlign: 'left'}]}>
                                                        {item.type}
                                                    </Text>
                                                </View>
                                                {
                                                    isNaN(Number(item.difficult))? null:
                                                    Array.from(Array(Number(item.difficult))).map((obj, index)=>{
                                                        return <Icon.AntDesign key={`${item.name}_star_${index}`} 
                                                                    name="star" size={12} color='rgb(241, 196, 15)' />
                                                    })
                                                }
                                            </View>
                                            <View style={[{marginBottom: 3, alignSelf: 'flex-start'}]}>
                                                <Text style={[styles.textStyle, {fontSize: 17, fontWeight: 'bold', textAlign: 'left'}]}>{item.name}</Text>
                                            </View>
                                            <View style={[{marginBottom: 3, alignSelf: 'flex-start'}]}>
                                                <Text style={[styles.textStyle, {fontSize: 13, color: Util.grey, textAlign: 'left'}]}>{
                                                    (item.nutrition||[]).map((optionObj, optionIndex)=>{
                                                        return `${optionObj.name} ${optionObj.number||''}`
                                                    }).join(', ')
                                                }</Text>
                                            </View>
                                            <View style={[{alignSelf: 'flex-start'}]}>
                                                <Text style={[styles.textStyle, {fontSize: 11, color: Util.grey, textAlign: 'left'}]}>{
                                                    (item.calory||[]).map((optionObj, optionIndex)=>{
                                                        return `${optionObj.name} ${optionObj.number||''}`
                                                    }).join(', ')
                                                }</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.trContainer}>
                                        <View style={[styles.tdContainer, {flex: 0.5, borderBottomWidth: 3, marginRight: 5}, 
                                            item.cookingYn=='Y'?{borderColor: saveColor}:{borderColor: 'white'}]}>
                                            <TouchableOpacity onPress={()=>this.updateCookingChecked(item)}>
                                                <View style={[styles.trContainer]}>
                                                    <CheckBox containerStyle={{backgroundColor: 'grey'}}
                                                        value={item.cookingYn=='Y'?true:false} onValueChange={()=>this.updateCookingChecked(item)} />
                                                    <Text style={[styles.thTextStyle, {color: Util.grey, fontWeight: 'bold'},
                                                        item.cookingYn=='Y'?{color: saveColor}:null]}>쿠킹</Text>
                                                </View>
                                                <View style={[styles.trContainer, {flex: 0.5}]}>{
                                                    (item.cooking||[]).map((optionObj, optionIndex)=>{
                                                        return <Text style={[styles.textStyle, {color: Util.grey},
                                                            item.cookingYn=='Y'?{color: saveColor}:null]} key={`cooking_${encodeURI(item.name)}_${optionIndex}`}>
                                                            {`${optionObj.name} ${optionObj.number}`}
                                                        </Text>
                                                    })
                                                }</View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.tdContainer, {flex: 0.5, borderBottomWidth: 3, marginLeft: 5}, 
                                            item.tastingYn=='Y'?{borderColor: openColor}:{borderColor: 'white'}]}>
                                            <TouchableOpacity onPress={()=>this.updateTastingChecked(item)}>
                                                <View style={[styles.trContainer]}>
                                                    <CheckBox value={item.tastingYn=='Y'?true:false} onValueChange={()=>this.updateTastingChecked(item)} />
                                                    <Text style={[styles.thTextStyle, {color: Util.grey, fontWeight: 'bold'},
                                                        item.tastingYn=='Y'?{color: openColor}:null]}>맛보기</Text>
                                                </View>
                                                <View style={[styles.trContainer, {flex: 0.5}]}>{
                                                    (item.tasting||[]).map((optionObj, optionIndex)=>{
                                                        return <Text style={[styles.textStyle, {color: Util.grey},
                                                            item.tastingYn=='Y'?{color: openColor}:null]} key={`tasting_${encodeURI(item.name)}_${optionIndex}`}>
                                                            {`${optionObj.name} ${optionObj.number}`}
                                                        </Text>
                                                    })
                                                }</View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            }} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    itemImageStyle: {
        width: '100%',
        resizeMode: 'contain',
    },
    componentContainer: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        margin: 10,
        padding: 5,
        elevation: 5,
    },
    trContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tdContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    thTextStyle: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textStyle: {
        textAlign: 'center',
        color: 'rgb(94, 94, 94)'
    },

    scrollUpIconStyle: {
        position:'absolute', 
        right: 10, 
        bottom: 10, 
        zIndex: 999, 
        elevation: 5, 
        padding: 10,
        borderRadius: 20,
        backgroundColor: Util.tabColor
    }
})

export default withNavigation(FoodList)