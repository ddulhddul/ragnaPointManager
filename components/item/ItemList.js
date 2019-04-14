import React from 'react'
import { 
    CheckBox, ScrollView, View, Text, StyleSheet, AsyncStorage,
    TextInput, Picker, Image, FlatList, TouchableOpacity
} from 'react-native'
import SqlUtil from '../common/SqlUtil'
import { withNavigation } from 'react-navigation'
import Util from '../common/Util'
import Loading from '../common/Loading'
import { Icon } from 'expo'
import CommonStyles from '../common/style'
const saveColor= 'rgb(230, 126, 34)'
const openColor= 'rgb(41, 128, 185)'

class ItemList extends SqlUtil {

    constructor(props){
        super(props)
        const keywordList = (props.itemList||[]).reduce((entry, obj)=>{
            (obj.keyword||[]).map((keyword)=>{
                if(keyword && !keyword.match(/[^a-zA-Z]/) && !entry.includes(keyword)){
                    entry.push(keyword)
                }
            })
            return entry
        }, []).sort()
        this.state = {
            itemList: [],
            keywordList,
            filter: [],
            saveFilter: false,
            openFilter: false,
            sort: 'name_asc',
            searchEnabled: false,
            searchValue: ''
        }
    }

    componentDidMount(){
        const { navigation } = this.props
        this.focusListener = navigation.addListener("didFocus", async () => {
            this.isReady = false
            const itemList = await this.searchItemList()
            let searchParam = {}
            try {
                const value = await AsyncStorage.getItem('ITEM_SEARCH')
                if (value !== null) {
                    const itemSearchObj = JSON.parse(value)
                    searchParam = {
                        filter: itemSearchObj.filter, 
                        saveFilter: itemSearchObj.saveFilter,
                        openFilter: itemSearchObj.openFilter,
                        sort: itemSearchObj.sort,
                    }
                }
            } catch (error) {
                // Error retrieving data
            }
            this.isReady = true
            this.setState({
                itemList: itemList,
                ...searchParam
            })
        })
        this.willBlurListener = navigation.addListener("willBlur", async () => {
            this.beforeUnmountSave()
        })
    }

    beforeUnmountSave = async()=>{
        try {
            const {filter, saveFilter, openFilter, sort} = this.state
            await AsyncStorage.setItem('ITEM_SEARCH', JSON.stringify({
                filter, saveFilter, openFilter, sort
            }))
        } catch (error) {
            // Error retrieving data
        }
    }
    
    componentWillUnmount(){
        this.beforeUnmountSave()
        this.focusListener && this.focusListener.remove()
        this.willBlurListener && this.willBlurListener.remove()
    }

    searchItemList = async () => {
        const dbItemList = await this.listTnItem()
        const ingredientList = await this.listTnIngredient()
        return this.props.itemList.map((item)=>{
            const targetDbObj = (dbItemList.find((dbItem)=>dbItem.name==item.name) || {})
            return {
                ...item,
                price: item.recipe.reduce((entry, obj)=>{
                    if(entry < 0) return entry
                    const ingreObj = ingredientList.find((ingre)=>{
                        return ingre.name == obj.name && ingre.price > 0
                    })
                    if(!ingreObj) return -1
                    return entry + (ingreObj.price * obj.number)
                }, 0),
                saveYn: targetDbObj.saveYn,
                openYn: targetDbObj.openYn,
            }
        })
    }

    executeUpdateItem = async (obj) => {
        const dbObj = await this.selectItemByName(obj)
        if(dbObj) await this.updateItem(obj)
        else await this.insertItem(obj)

        Util.toast(obj.message)
        this.setState({
            itemList: await this.searchItemList()
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
        const { scrolling, saveFilter, openFilter, sort, searchEnabled, searchValue } = this.state
        const keywordList = this.state.keywordList || []
        const filter = this.state.filter || []
        const nameSearchGuideList = []

        function checkedSaveCheck(list=[]){
            return list.reduce((entry, optionObj)=>{
                if(entry) return entry
                return !filter.length? true: filter.includes(optionObj.name)
            }, false)
        }
        const itemList = (this.state.itemList || []).filter((obj)=>{
            // filterList
            if(!filter.length) return true
            return filter.reduce((entry, filterObj)=>{
                if(entry) return true
                return (obj.keyword || []).includes(filterObj)
            }, false)
        }).filter((obj)=>{
            // saveFilter, openFilter
            if(!saveFilter && !openFilter) return true
            return (saveFilter && obj.saveYn != 'Y' && checkedSaveCheck(obj.savePoint)) 
                || (openFilter && obj.openYn != 'Y' && checkedSaveCheck(obj.openPoint))
        }).filter((obj)=>{
            // searchValue
            if(!searchEnabled || !searchValue) return true
            return obj.name.indexOf(searchValue) != -1
        }).filter((obj)=>{
            !nameSearchGuideList.includes(obj.firstChar) && nameSearchGuideList.push(obj.firstChar)
            return true
        }).sort((obj1, obj2)=>{
            if(sort == 'name_asc'){
                return obj1.name > obj2.name ? 1: -1

            }else if(sort == 'price_asc'){
                if(obj1.price <= 0) return 1
                return obj1.price > obj2.price ? 1: -1

            }else if(sort == 'price_desc'){
                if(obj2.price <= 0) return 1
                return obj1.price < obj2.price ? 1: -1
            }
            return 0
        })
        
        return (
            <View style={styles.container}>
                {(!this.isReady)? <Loading />:null}
                <View style={styles.filterContainer}>
                    <View style={[styles.filterStyle, {backgroundColor: Util.green}]}>
                        <TouchableOpacity onPress={()=>{this.setState({filter: []})}}>
                            <Text style={[styles.filterTextStyle]}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} style={{marginLeft: 5}}>
                    {
                        keywordList.map((obj)=>{
                            return <View  key={`keyword_${obj}`}
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
                    <View style={[styles.trContainer]}>
                        <Picker
                            selectedValue={sort}
                            mode="dropdown"
                            style={{width: '100%', maxWidth: 200}}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({sort: itemValue})}>
                            <Picker.Item label="이름순" value="name_asc" />
                            <Picker.Item label="낮은가격순" value="price_asc" />
                            <Picker.Item label="높은가격순" value="price_desc" />
                        </Picker>
                    </View>
                    <View style={[styles.trContainer, {marginLeft: 10}]}>
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
                        <View style={[{marginLeft: 10, marginRight: 5, padding: 5}, 
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
                    !itemList.length? null:
                    <View style={{alignItems: 'flex-end', marginRight: 10}}>
                        <Text style={{fontSize: 8}}>Total {Util.comma(itemList.length || 0)}</Text>
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
                            data={itemList}
                            keyExtractor={(item) => item.name}
                            renderItem={({item, index}) => {
                                return <View style={styles.componentContainer} key={`item_${encodeURI(item.name)}_${index}`}>
                                    <View style={[styles.trContainer]}>
                                        <View style={[styles.tdContainer, {flex: 0.3, marginLeft: 5, marginRight: 5}]}>
                                            <Image source={require('../../assets/images/items/거시기.png')} style={styles.itemImageStyle} />
                                        </View>
                                        <View style={[styles.tdContainer, {flex: 0.7}]}>
                                            {
                                                (!item.price || item.price <= 0) ? null:
                                                <View style={[{marginBottom: 3, alignSelf: 'flex-start'}]}>
                                                    <Text style={[styles.textStyle, {fontSize: 11, color: Util.grey, textAlign: 'left'}]}>{`${Util.comma(item.price)} zenny`}</Text>
                                                </View>
                                            }
                                            <View style={[{marginBottom: 3, alignSelf: 'flex-start'}]}>
                                                <Text style={[styles.textStyle, {fontSize: 17, fontWeight: 'bold', textAlign: 'left'}]}>{item.name}</Text>
                                            </View>
                                            <View style={[{marginBottom: 3, alignSelf: 'flex-start'}]}>
                                                <Text style={[styles.textStyle, {fontSize: 13, color: Util.grey, textAlign: 'left'}]}>{
                                                    item.option.map((optionObj, optionIndex)=>{
                                                        return `${optionObj.name} ${optionObj.number||''}`
                                                    }).join(', ')
                                                }</Text>
                                            </View>
                                            <View style={[{alignSelf: 'flex-start'}]}>
                                                <Text style={[styles.textStyle, {fontSize: 11, color: Util.grey, textAlign: 'left'}]}>{
                                                    !item.recipe || !item.recipe.length ? '':
                                                    '재료: '+item.recipe.map((optionObj, optionIndex)=>{
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
                                                        item.saveYn=='Y'?{color: saveColor}:null]}>저장</Text>
                                                </View>
                                                <View style={[styles.trContainer, {flex: 0.5}]}>{
                                                    item.savePoint.map((optionObj, optionIndex)=>{
                                                        return <Text style={[styles.textStyle, {color: Util.grey},
                                                            item.saveYn=='Y'?{color: saveColor}:null]} key={`saveOption_${encodeURI(item.name)}_${optionIndex}`}>
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
                                                    item.openPoint.map((optionObj, optionIndex)=>{
                                                        return <Text style={[styles.textStyle, {color: Util.grey},
                                                            item.openYn=='Y'?{color: openColor}:null]} key={`openOption_${encodeURI(item.name)}_${optionIndex}`}>
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
                    {/* {
                        sort != 'name_asc'? null:
                        <View style={{marginTop: 10, marginBottom: 10}}>{
                            nameSearchGuideList.map((obj)=>{
                                return <TouchableOpacity onPress={()=>{
                                    const target = itemList.reduce((entry, item, index)=>{
                                        if(!entry && obj==item.firstChar) return {...item, index}
                                        return entry
                                    }, null)
                                    console.log('target',target, this.flatlist)
                                    target && this.list.scrollToIndex({
                                        animated: true,
                                        index: target.index
                                    })

                                }} key={obj}>
                                    <Text style={[
                                        {color: Util.grey}
                                    ]}>{obj}</Text>
                                </TouchableOpacity>
                            })
                        }</View>
                    } */}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ...CommonStyles.commonStyles,
})

export default withNavigation(ItemList)
