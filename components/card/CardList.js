import React from 'react'
import { 
    CheckBox, ScrollView, View, Text, StyleSheet, Alert, Image,
    TextInput, AsyncStorage, FlatList, TouchableOpacity
} from 'react-native'
import SqlUtil from '../common/SqlUtil'
import { withNavigation } from 'react-navigation'
import Util from '../common/Util'
import NoData from '../common/NoData'
import Loading from '../common/Loading'
import { Icon, AdMobBanner } from 'expo'
import Private from '../common/Private'
import CommonStyles from '../common/style'
const saveColor= 'rgb(230, 126, 34)'
const openColor= 'rgb(41, 128, 185)'

class CardList extends SqlUtil {
    
    constructor(props){
        super(props)
        const optionKeywordList = (props.cardList||[]).reduce((entry, obj)=>{
            (obj.optionKeyword||[]).map((target)=>{
                if(!entry.includes(target)) entry.push(target)
            })
            return entry
        }, []).sort()
        const saveKeywordList = (props.cardList||[]).reduce((entry, obj)=>{
            (obj.saveKeyword||[]).concat(obj.openKeyword||[]).map((target)=>{
                if(!entry.includes(target)) entry.push(target)
            })
            return entry
        }, []).sort()

        this.state = {
            cardList: [],
            optionKeywordList,
            saveKeywordList
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
                        filter: cardSearchObj.filter, 
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
            const {filter, saveFilter, openFilter, optionFilter} = this.state
            await AsyncStorage.setItem('CARD_SEARCH', JSON.stringify({
                filter, saveFilter, openFilter, optionFilter
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
        const saveKeywordList = this.state.saveKeywordList || []
        const filter = this.state.filter || []

        function checkedSaveCheck(list=[]){
            return list.reduce((entry, optionObj)=>{
                if(entry) return entry
                return !optionFilter.length? true: optionFilter.includes(optionObj)
            }, false)
        }
        const cardList = (this.state.cardList || [])
        .filter((obj)=>{
            // filterList
            if(!filter.length) return true
            return (obj.saveKeyword||[]).concat(obj.openKeyword||[]).reduce((entry, target)=>{
                if(entry) return entry
                return filter.includes(target)
            }, false)
        })
        .filter((obj)=>{
            // optionFilter
            if(!optionFilter.length) return true
            return (obj.optionKeyword||[]).reduce((entry, target)=>{
                if(entry) return entry
                return optionFilter.includes(target)
            }, false)
        })
        .filter((obj)=>{
            // saveFilter, openFilter
            if(!saveFilter && !openFilter) return true
            return (saveFilter && obj.saveYn != 'Y' && checkedSaveCheck(obj.saveKeyword)) 
                || (openFilter && obj.openYn != 'Y' && checkedSaveCheck(obj.openKeyword))
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
                            <Text style={[styles.filterTextStyle]}>옵션 Reset</Text>
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
                
                <View style={styles.filterContainer}>
                    <View style={[styles.filterStyle, {backgroundColor: Util.green}]}>
                        <TouchableOpacity onPress={()=>{this.setState({filter: []})}}>
                            <Text style={[styles.filterTextStyle]}>저장 Reset</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} style={{marginLeft: 5}}>
                    {
                        saveKeywordList.map((obj)=>{
                            return <View  key={`keyword_save_${obj}`}
                                        style={[styles.filterStyle, 
                                            filter.includes(obj)? {backgroundColor: Util.filterSelected}: {}
                                        ]}>
                                <TouchableOpacity onPress={()=>{
                                    this.setState({
                                        filter: !filter.includes(obj)? [...filter, obj]:
                                                    filter.filter((filtered)=>filtered!=obj)
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
                {!cardList.length? <NoData /> :
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
                                return <View key={`card_${encodeURI(item.name)}_${index}`}>
                                {
                                    index%10!=0? null:
                                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <AdMobBanner
                                        bannerSize="banner"
                                        adUnitID={Private.admobId}
                                        testDeviceID="EMULATOR"
                                        onDidFailToReceiveAdWithError={this.bannerError} />
                                    </View>
                                }
                                <View style={[styles.componentContainer, {borderTopColor: item.color, borderTopWidth: 2}]} >
                                    <View style={[styles.trContainer]}>
                                        <View style={[styles.tdContainer, {flex: 0.3, marginLeft: 5, marginRight: 5, paddingLeft: 10, paddingRight: 10}]}>
                                            <Image source={cardImages[item.name.replace(/ /g,'').replace(/\[.*\]/g,'').replace(/\★/g,'')]} style={[styles.itemImageStyle, {borderRadius: 5}]} />
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
                                                    item.option
                                                }</Text>
                                            </View>
                                            <View style={[{alignSelf: 'flex-start'}]}>
                                                <Text style={[styles.textStyle, {fontSize: 11, color: Util.grey, textAlign: 'left'}]}>
                                                    {`획득: ${item.monster}`}
                                                </Text>
                                            </View>
                                            {
                                                (!item.ingreCardList || !item.ingreCardList.length)? null:
                                                <View style={[{flex:1, alignSelf: 'flex-start'/* , alignItems:'center' */}]}>
                                                    <Text style={[styles.textStyle, {fontSize: 12, color: Util.grey, textAlign: 'left', marginBottom: 3}]}>
                                                        {'제작'}
                                                    </Text>
                                                    <View style={[styles.tdContainer, {alignItems: 'flex-start'}]}>
                                                        <View style={[styles.trContainer, {justifyContent: 'flex-start', flexWrap: 'wrap'}]}>{
                                                            (item.ingreCardList||[]).map((optionObj, optionIndex)=>
                                                                <View style={{flexDirection:'row', marginLeft: 5}} key={`ingreCardList_${optionObj.name}_${item.name}_${optionIndex}`}>
                                                                    {!cardImages[optionObj.name.replace(/ /g,'').replace(/\[.*\]/g,'')+'카드']? null:
                                                                        <Image style={[styles.itemImageStyle, {width: 20, height:20, borderRadius: 20}]} 
                                                                            source={cardImages[optionObj.name.replace(/ /g,'').replace(/\[.*\]/g,'')+'카드']} />
                                                                    }
                                                                    <Text style={[styles.textStyle, {fontSize: 12, color: Util.grey, textAlign: 'left', fontWeight:'bold', marginLeft: 5}]}>
                                                                        {`${optionObj.name} x${optionObj.count}`}
                                                                    </Text>
                                                                </View>
                                                            )
                                                        }</View>
                                                    </View>
                                                </View>
                                            }
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
                                                <View style={[styles.trContainer, {flex: 0.5}]}>
                                                    <Text style={[styles.textStyle, {color: Util.grey, marginLeft:5, marginRight:5},
                                                        item.saveYn=='Y'?{color: saveColor}:null]}>{
                                                        item.savePoint
                                                    }</Text>
                                                </View>
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
                                                <View style={[styles.trContainer, {flex: 0.5}]}>
                                                    <Text style={[styles.textStyle, {color: Util.grey, marginLeft:5, marginRight:5},
                                                        item.openYn=='Y'?{color: openColor}:null]}>{
                                                        item.openPoint
                                                    }</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            }} />
                    </View>
                </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ...CommonStyles.commonStyles
})

export default withNavigation(CardList)