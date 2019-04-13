import React, { Component } from 'react'
import { 
    CheckBox, ScrollView, View, Text, StyleSheet,
    TextInput, Picker, Image, FlatList, TouchableOpacity
} from 'react-native'
import Util from '../common/Util'
import Loading from '../common/Loading'
import { Icon } from 'expo'

class FoodList extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            isReady: true,
            foodList: props.foodList || []
        }
    }
    
    render() {
        const { scrolling, foodList } = this.state
        
        return (
            <View style={styles.container}>
                {/* {(!this.isReady)? <Loading />:null} */}

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
                                                    item.nutrition.map((optionObj, optionIndex)=>{
                                                        return `${optionObj.name} ${optionObj.number||''}`
                                                    }).join(', ')
                                                }</Text>
                                            </View>
                                            <View style={[{alignSelf: 'flex-start'}]}>
                                                <Text style={[styles.textStyle, {fontSize: 11, color: Util.grey, textAlign: 'left'}]}>{
                                                    item.calory.map((optionObj, optionIndex)=>{
                                                        return `${optionObj.name} ${optionObj.number||''}`
                                                    }).join(', ')
                                                }</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.trContainer}>
                                        <View style={[styles.tdContainer, {flex: 0.5, borderBottomWidth: 3, marginRight: 5}, 
                                            item.saveYn=='Y'?{borderColor: saveColor}:{borderColor: 'white'}]}>
                                            <TouchableOpacity onPress={()=>this.updateSaveChecked(item)}>
                                                <View style={[styles.trContainer]}>
                                                    <CheckBox containerStyle={{backgroundColor: 'grey'}}
                                                        value={item.saveYn=='Y'?true:false} onValueChange={()=>this.updateSaveChecked(item)} />
                                                    <Text style={[styles.thTextStyle, {color: Util.grey, fontWeight: 'bold'},
                                                        item.saveYn=='Y'?{color: saveColor}:null]}>쿠킹</Text>
                                                </View>
                                                <View style={[styles.trContainer, {flex: 0.5}]}>{
                                                    // item.savePoint.map((optionObj, optionIndex)=>{
                                                    //     return <Text style={[styles.textStyle, {color: Util.grey},
                                                    //         item.saveYn=='Y'?{color: saveColor}:null]} key={`saveOption_${encodeURI(item.name)}_${optionIndex}`}>
                                                    //         {`${optionObj.name} ${optionObj.number}`}
                                                    //     </Text>
                                                    // })
                                                }</View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.tdContainer, {flex: 0.5, borderBottomWidth: 3, marginLeft: 5}, 
                                            item.openYn=='Y'?{borderColor: openColor}:{borderColor: 'white'}]}>
                                            <TouchableOpacity onPress={()=>this.updateOpenChecked(item)}>
                                                <View style={[styles.trContainer]}>
                                                    <CheckBox value={item.openYn=='Y'?true:false} onValueChange={()=>this.updateOpenChecked(item)} />
                                                    <Text style={[styles.thTextStyle, {color: Util.grey, fontWeight: 'bold'},
                                                        item.openYn=='Y'?{color: openColor}:null]}>맛보기</Text>
                                                </View>
                                                <View style={[styles.trContainer, {flex: 0.5}]}>{
                                                    // item.openPoint.map((optionObj, optionIndex)=>{
                                                    //     return <Text style={[styles.textStyle, {color: Util.grey},
                                                    //         item.openYn=='Y'?{color: openColor}:null]} key={`openOption_${encodeURI(item.name)}_${optionIndex}`}>
                                                    //         {`${optionObj.name} ${optionObj.number}`}
                                                    //     </Text>
                                                    // })
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

export default FoodList