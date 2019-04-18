import React from 'react'
import { 
    CheckBox, ScrollView, View, Text, StyleSheet, Alert, Image,
    TextInput, AsyncStorage, FlatList, TouchableOpacity
} from 'react-native'
import SqlUtil from '../common/SqlUtil'
import { withNavigation } from 'react-navigation'
import Util from '../common/Util'
import Loading from '../common/Loading'
import { Icon } from 'expo'
import CommonStyles from '../common/style'
const saveColor= 'rgb(230, 126, 34)'
const openColor= 'rgb(41, 128, 185)'

class CardList extends SqlUtil {
    
    constructor(props){
        super(props)
        const saveKeywordList = (props.cardList||[]).reduce((entry, obj)=>{
            [obj.openPoint||{},obj.savePoint||{}].map((target)=>{
                const keyword = target.name
                keyword!='?' && !entry.includes(keyword) && entry.push(keyword)
            })
            return entry
        }, []).sort()
        this.state = {
            cardList: props.cardList||[],
            saveKeywordList
        }
    }

    componentDidMount(){
        const { navigation } = this.props
        this.focusListener = navigation.addListener("didFocus", async () => {
            this.isReady = false
            // const cardList = await this.searchCardList()
            // let searchParam = {}
            // try {
            //     const value = await AsyncStorage.getItem('FOOD_SEARCH')
            //     if (value !== null) {
            //         const foodSearchObj = JSON.parse(value)
            //         searchParam = {
            //             cookingFilter: foodSearchObj.cookingFilter, 
            //             tastingFilter: foodSearchObj.tastingFilter,
            //             saveFilter: foodSearchObj.saveFilter
            //         }
            //     }
            // } catch (error) {
            //     // Error retrieving data
            // }
            this.isReady = true
            // this.setState({
            //     cardList: cardList,
            //     ...searchParam
            // })
        })
        this.willBlurListener = navigation.addListener("willBlur", async () => {
            this.beforeUnmountSave()
        })
    }

    componentDidUpdate(){
        this.beforeUnmountSave()
    }

    beforeUnmountSave = async()=>{
        // try {
        //     const {cookingFilter, tastingFilter, saveFilter} = this.state
        //     await AsyncStorage.setItem('FOOD_SEARCH', JSON.stringify({
        //         cookingFilter, tastingFilter,
        //         saveFilter
        //     }))
        // } catch (error) {
        //     // Error retrieving data
        // }            
    }

    searchCardList= async () => {
        const savedList = (await this.listTnFood()) || []
        return this.props.cardList.map((obj)=>{
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
        this.beforeUnmountSave()
        this.focusListener && this.focusListener.remove()
        this.willBlurListener && this.willBlurListener.remove()
    }

    updateSaveChecked(){

    }
    
    updateOpenChecked(){

    }

    render() {
        const { cardImages } = this.props
        const { searchValue, scrolling, searchEnabled } = this.state
        const saveKeywordList = this.state.saveKeywordList || []
        const saveFilter = this.state.saveFilter || []

        const cardList = (this.state.cardList || [])
        .filter((obj)=>{
            if(!searchEnabled || !searchValue) return true
            return obj.name.indexOf(searchValue) != -1
        })
        
        return (
            <View style={styles.container}>
                {/* {(!this.isReady)? <Loading />:null} */}

                {
                    !cardList.length? null:
                    <View style={{alignItems: 'flex-end', marginRight: 10}}>
                        <Text style={{fontSize: 8}}>Total {Util.comma(cardList.length || 0)}</Text>
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
                            data={cardList}
                            keyExtractor={(item) => item.name}
                            renderItem={({item, index}) => {
                                return <View style={styles.componentContainer} key={`card_${encodeURI(item.name)}_${index}`}>
                                    <View style={[styles.trContainer]}>
                                        <View style={[styles.tdContainer, {flex: 0.3, marginLeft: 5, marginRight: 5, paddingLeft: 10, paddingRight: 10}]}>
                                            <Image source={cardImages[item.name.replace(/ /g,'').replace(/\[.*\]/g,'')]} style={[styles.itemImageStyle, {borderRadius: 5}]} />
                                        </View>
                                        <View style={[styles.tdContainer, {flex: 0.7}]}>
                                            <View style={[{marginBottom: 3, alignSelf: 'flex-start'}]}>
                                                <Text style={[styles.textStyle, {fontSize: 11, color: Util.grey, textAlign: 'left'}]}>
                                                    {item.position}
                                                </Text>
                                            </View>
                                            <View style={[{marginBottom: 3, alignSelf: 'flex-start'}]}>
                                                <Text style={[styles.textStyle, {fontSize: 17, fontWeight: 'bold', textAlign: 'left'}]}>{item.name}</Text>
                                            </View>
                                            <View style={[{marginBottom: 3, alignSelf: 'flex-start'}]}>
                                                <Text style={[styles.textStyle, {fontSize: 13, color: Util.grey, textAlign: 'left'}]}>{
                                                    (item.option||[]).map((optionObj, optionIndex)=>{
                                                        return `${optionObj.name} ${optionObj.number||''}`
                                                    }).join(', ')
                                                }</Text>
                                            </View>
                                            <View style={[{alignSelf: 'flex-start'}]}>
                                                <Text style={[styles.textStyle, {fontSize: 11, color: Util.grey, textAlign: 'left'}]}>
                                                    {`획득: ${item.monster}`}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={[styles.trContainer, {marginTop: 3}]}>
                                        <View style={[styles.tdContainer, {flex: 0.5, borderBottomWidth: 3, marginRight: 5}, 
                                            item.saveYn=='Y'?{borderColor: saveColor}:{borderColor: 'white'}]}>
                                            <TouchableOpacity onPress={()=>this.updateSaveChecked(item)}>
                                                <View style={[styles.trContainer]}>
                                                    <CheckBox containerStyle={{backgroundColor: 'grey'}}
                                                        value={item.saveYn=='Y'?true:false} onValueChange={()=>this.updateSaveChecked(item)} />
                                                    <Text style={[styles.thTextStyle, {color: Util.grey, fontWeight: 'bold'},
                                                        item.saveYn=='Y'?{color: saveColor}:null]}>저장</Text>
                                                </View>
                                                <View style={[styles.trContainer, {flex: 0.5}]}>{
                                                    ([item.savePoint||{}]).map((optionObj, optionIndex)=>{
                                                        return <Text style={[styles.textStyle, {color: Util.grey, marginLeft:5, marginRight:5},
                                                            item.saveYn=='Y'?{color: saveColor}:null]} key={`save_${encodeURI(item.name)}_${optionIndex}`}>
                                                            {`${optionObj.name} ${optionObj.number}`}
                                                        </Text>
                                                    })
                                                }</View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={[styles.tdContainer, {flex: 0.5, borderBottomWidth: 3, marginLeft: 5}, 
                                            item.openYn=='Y'?{borderColor: openColor}:{borderColor: 'white'}]}>
                                            <TouchableOpacity onPress={()=>this.updateOpenChecked(item)}>
                                                <View style={[styles.trContainer]}>
                                                    <CheckBox value={item.openYn=='Y'?true:false} onValueChange={()=>this.updateOpenChecked(item)} />
                                                    <Text style={[styles.thTextStyle, {color: Util.grey, fontWeight: 'bold'},
                                                        item.openYn=='Y'?{color: openColor}:null]}>해제</Text>
                                                </View>
                                                <View style={[styles.trContainer, {flex: 0.5}]}>{
                                                    ([item.openPoint||{}]).map((optionObj, optionIndex)=>{
                                                        return <Text style={[styles.textStyle, {color: Util.grey, marginLeft:5, marginRight:5},
                                                            item.openYn=='Y'?{color: openColor}:null]} key={`open_${encodeURI(item.name)}_${optionIndex}`}>
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
    ...CommonStyles.commonStyles
})

export default withNavigation(CardList)