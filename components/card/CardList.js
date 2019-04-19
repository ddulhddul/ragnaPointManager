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
        const optionKeywordList = (props.cardList||[]).reduce((entry, obj)=>{
            [obj.openPoint||{},obj.savePoint||{}].map((target)=>{
                const keyword = target.name
                keyword!='?' && !entry.includes(keyword) && entry.push(keyword)
            })
            return entry
        }, []).filter((obj)=>obj.length<15).sort()

        this.state = {
            cardList: [],
            optionKeywordList
        }
    }

    componentDidMount(){
        const { navigation } = this.props
        this.focusListener = navigation.addListener("didFocus", async () => {
            this.isReady = false
            const cardList = await this.searchCardList()
            let searchParam = {}
            try {
                const value = await AsyncStorage.getItem('CARD_SEARCH')
                if (value !== null) {
                    const cardSearchObj = JSON.parse(value)
                    searchParam = {
                        saveFilter: cardSearchObj.saveFilter,  
                        openFilter: cardSearchObj.openFilter, 
                        optionFilter: cardSearchObj.optionFilter, 
                    }
                }
            } catch (error) {
                // Error retrieving data
            }
            this.isReady = true
            this.setState({
                cardList: cardList,
                ...searchParam
            })
        })
        this.willBlurListener = navigation.addListener("willBlur", async () => {
            this.beforeUnmountSave()
        })
    }

    componentDidUpdate(){
        this.beforeUnmountSave()
    }

    beforeUnmountSave = async()=>{
        try {
            const {saveFilter, openFilter, optionFilter} = this.state
            await AsyncStorage.setItem('CARD_SEARCH', JSON.stringify({
                saveFilter, openFilter, optionFilter
            }))
        } catch (error) {
            // Error retrieving data
        }      
    }

    searchCardList= async () => {
        const savedList = (await this.listTnCard()) || []
        return this.props.cardList.map((obj)=>{
            const saved = savedList.find((saved)=>{
                return saved.name == obj.name
            }) || {}
            return {
                ...obj,
                saveYn: saved.saveYn || 'N',
                openYn: saved.openYn || 'N',
            }
        })
    }
    
    componentWillUnmount(){
        this.beforeUnmountSave()
        this.focusListener && this.focusListener.remove()
        this.willBlurListener && this.willBlurListener.remove()
    }

    executeUpdateItem = async (obj) => {
        const dbObj = await this.selectCardByName(obj)
        if(dbObj) await this.updateCard(obj)
        else await this.insertCard(obj)

        Util.toast(obj.message)
        this.setState({
            cardList: await this.searchCardList()
        })
    }

    updateSaveChecked(param){
        this.executeUpdateItem({
            ...param,
            saveYn: param.saveYn=='Y'? 'N': 'Y',
            message: param.saveYn=='Y'? `${param.name} 저장 취소`: `${param.name} 저장`
        })
    }
    
    updateOpenChecked(param){
        this.executeUpdateItem({
            ...param,
            openYn: param.openYn=='Y'? 'N': 'Y',
            message: param.openYn=='Y'? `${param.name} 해제 취소`: `${param.name} 해제`
        })
    }

    render() {
        const { cardImages } = this.props
        const { saveFilter, openFilter, searchValue, scrolling, searchEnabled } = this.state
        const optionKeywordList = this.state.optionKeywordList || []
        const optionFilter = this.state.optionFilter || []

        function checkedSaveCheck(list=[]){
            return list.reduce((entry, optionObj)=>{
                if(entry) return entry
                return !optionFilter.length? true: optionFilter.includes(optionObj.name)
            }, false)
        }
        const cardList = (this.state.cardList || [])
        .filter((obj)=>{
            // optionFilter
            if(!optionFilter.length) return true
            return [(obj.savePoint||{})].concat([obj.openPoint||{}]).reduce((entry, target)=>{
                if(entry) return entry
                return optionFilter.includes(target.name)
            }, false)
        })
        .filter((obj)=>{
            // saveFilter, openFilter
            if(!saveFilter && !openFilter) return true
            return (saveFilter && obj.saveYn != 'Y' && checkedSaveCheck([obj.savePoint])) 
                || (openFilter && obj.openYn != 'Y' && checkedSaveCheck([obj.openPoint]))
        })
        .filter((obj)=>{
            if(!searchEnabled || !searchValue) return true
            return obj.name.indexOf(searchValue) != -1
        })
        .map((obj)=>{
            return {...obj, 
                color: obj.rate=="파랑"? 'blue':
                    obj.rate=="녹색"? 'green':
                    obj.rate=="보라"? 'purple':
                    obj.rate=="일반"? 'grey': null,
            }
        })
        
        return (
            <View style={styles.container}>
                {(!this.isReady)? <Loading />:null}

                <View style={styles.filterContainer}>
                    <View style={[styles.filterStyle, {backgroundColor: Util.green}]}>
                        <TouchableOpacity onPress={()=>{this.setState({optionFilter: []})}}>
                            <Text style={[styles.filterTextStyle]}>저장 Reset</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} style={{marginLeft: 5}}>
                    {
                        optionKeywordList.map((obj)=>{
                            return <View  key={`keyword_${obj}`}
                                        style={[styles.filterStyle, 
                                            optionFilter.includes(obj)? {backgroundColor: Util.filterSelected}: {}
                                        ]}>
                                <TouchableOpacity onPress={()=>{
                                    this.setState({
                                        optionFilter: !optionFilter.includes(obj)? [...optionFilter, obj]:
                                                    optionFilter.filter((filtered)=>filtered!=obj)
                                    })
                                }}>
                                    <Text style={styles.filterTextStyle}>{obj}</Text>
                                </TouchableOpacity>
                            </View>
                        })
                    }
                    </ScrollView>
                </View>

                <View style={[styles.searchContainer]}>
                    <View style={[styles.trContainer, {marginLeft: 10, justifyContent: 'flex-end'}]}>
                        <CheckBox value={saveFilter} onValueChange={()=>
                            {this.setState({saveFilter: !saveFilter})}} />
                        <TouchableOpacity onPress={()=>
                            {this.setState({saveFilter: !saveFilter})}}>
                            <Text style={[styles.thTextStyle, {color: saveColor}]}>저장필요</Text>
                        </TouchableOpacity>
                        <CheckBox value={openFilter} onValueChange={()=>
                            {this.setState({openFilter: !openFilter})}} />
                        <TouchableOpacity onPress={()=>
                            {this.setState({openFilter: !openFilter})}}>
                            <Text style={[styles.thTextStyle, {color: openColor}]}>해제필요</Text>
                        </TouchableOpacity>
                        <View style={[{marginLeft: 10, padding: 5}, 
                            searchEnabled? {backgroundColor: Util.filterSelected, borderRadius: 10}: null]}>
                            <TouchableOpacity onPress={()=>{this.setState({searchEnabled: !searchEnabled})}}>
                                <Icon.Ionicons name="md-search" size={20}
                                    color={searchEnabled?"white":"black"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {
                    !searchEnabled? null:
                    <View style={{width: '95%', alignSelf: 'flex-end', borderWidth: 3, borderColor: Util.filterSelected,
                        marginLeft: 5, marginRight: 5}}>
                        <TextInput
                            autoFocus={true}
                            style={{borderColor: 'gray'}}
                            onChangeText={(text) => this.setState({searchValue: text})}
                            value={searchValue}
                        />
                    </View>
                }

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
                                return <View style={[styles.componentContainer, {borderTopColor: item.color, borderTopWidth: 2}]} key={`card_${encodeURI(item.name)}_${index}`}>
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
                                            <View style={[{flexDirection:'row', alignItems: 'center', marginBottom: 3, alignSelf: 'flex-start'}]}>
                                                <View style={[
                                                    {backgroundColor: item.color, borderRadius: 50, width: 10, height: 10, marginRight: 5, marginLeft: 5}
                                                ]}></View>
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