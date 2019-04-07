import React from 'react'
import { 
    CheckBox, ScrollView, View, Text, StyleSheet,
    Picker, Image, FlatList, TouchableOpacity
} from 'react-native'
import SqlUtil from '../common/SqlUtil'
import { withNavigation } from 'react-navigation'
import Util from '../common/Util'
import { Icon } from 'expo'
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
            this.setState({
                itemList: await this.searchItemList()
            })
        })
    }
    
    componentWillUnmount(){
        this.focusListener && this.focusListener.remove()
    }

    searchItemList = async () => {
        const dbItemList = await this.listTnItem()
        return this.props.itemList.map((item)=>{
            const targetDbObj = (dbItemList.find((dbItem)=>dbItem.name==item.name) || {})
            return {
                ...item,
                saveYn: targetDbObj.saveYn,
                openYn: targetDbObj.openYn,
            }
        })
    }

    executeUpdateItem = async (obj) => {
        const dbObj = await this.selectItemByName(obj)
        if(dbObj) await this.updateItem(obj)
        else await this.insertItem(obj)
        this.setState({
            itemList: await this.searchItemList()
        })
    }

    updateSaveChecked(param){
        this.executeUpdateItem({
            ...param,
            saveYn: param.saveYn=='Y'? 'N': 'Y',
        })
    }
    
    updateOpenChecked(param){
        this.executeUpdateItem({
            ...param,
            openYn: param.openYn=='Y'? 'N': 'Y',
        })
    }

    render() {
        const { saveFilter, openFilter, sort, searchEnabled, searchValue } = this.state
        const keywordList = this.state.keywordList || []
        const filter = this.state.filter || []
        const itemList = (this.state.itemList || []).filter((obj)=>{
            // filterList
            if(!filter.length) return true
            return filter.reduce((entry, filterObj)=>{
                if(entry) return true
                return (obj.keyword || []).includes(filterObj)
            }, false)
        }).filter((obj)=>{
            // saveFilter
            if(!saveFilter) return true
            return obj.saveYn != 'Y'
        }).filter((obj)=>{
            // openFilter
            if(!openFilter) return true
            return obj.openYn != 'Y'
        })
        
        return (
            <View style={styles.container}>
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
                
                <FlatList style={styles.scrollContainer}
                    data={itemList}
                    keyExtractor={(item) => item.name}
                    renderItem={({item, index}) => {
                        return <View style={styles.componentContainer} key={`item_${encodeURI(item.name)}_${index}`}>
                            <View style={[styles.trContainer]}>
                                <View style={[styles.tdContainer, {flex: 0.25}]}>
                                    <Image source={require('../../assets/images/robot-prod.png')} style={styles.itemImageStyle} />
                                </View>
                                <View style={[styles.tdContainer, {flex: 0.75}]}>
                                    <View style={styles.trContainer}>
                                        <View style={[styles.tdContainer, {flex: 0.5}]}>
                                            <Text style={styles.thTextStyle}>이름</Text>
                                        </View>
                                        <View style={[styles.tdContainer, {flex: 0.5}]}>
                                            <Text style={styles.thTextStyle}>옵션</Text>
                                        </View>
                                    </View>
                                    <View style={styles.trContainer}>
                                        <View style={[styles.tdContainer, {flex: 0.5}]}>
                                            <Text style={styles.textStyle}>{item.name}</Text>
                                        </View>
                                        <View style={[styles.tdContainer, {flex: 0.5}]}>{
                                            item.option.map((optionObj, optionIndex)=>{
                                                return <Text style={styles.textStyle} key={`option_${encodeURI(item.name)}_${optionIndex}`}>
                                                    {`${optionObj.name} ${optionObj.number}`}
                                                </Text>
                                            })
                                        }</View>
                                    </View>
                                    <View style={styles.trContainer}>
                                        <View style={[styles.trContainer]}>
                                            <Text style={styles.textStyle}>{
                                                item.recipe.map((optionObj, optionIndex)=>{
                                                    return `${optionObj.name} ${optionObj.number}`
                                                }).join(', ')
                                            }</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.trContainer}>
                                <View style={[styles.tdContainer, {flex: 0.5}]}>
                                    <TouchableOpacity onPress={()=>this.updateSaveChecked(item)}>
                                        <View style={[styles.trContainer]}>
                                            <CheckBox value={item.saveYn=='Y'?true:false} onValueChange={()=>this.updateSaveChecked(item)} />
                                            <Text style={styles.thTextStyle}>저장옵션</Text>
                                        </View>
                                        <View style={[styles.trContainer, {flex: 0.5}]}>{
                                            item.savePoint.map((optionObj, optionIndex)=>{
                                                return <Text style={styles.textStyle} key={`saveOption_${encodeURI(item.name)}_${optionIndex}`}>
                                                    {`${optionObj.name} ${optionObj.number}`}
                                                </Text>
                                            })
                                        }</View>
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.tdContainer, {flex: 0.5}]}>
                                    <TouchableOpacity onPress={()=>this.updateOpenChecked(item)}>
                                        <View style={[styles.trContainer]}>
                                            <CheckBox value={item.openYn=='Y'?true:false} onValueChange={()=>this.updateOpenChecked(item)} />
                                            <Text style={styles.thTextStyle}>해제옵션</Text>
                                        </View>
                                        <View style={[styles.trContainer, {flex: 0.5}]}>{
                                            item.openPoint.map((optionObj, optionIndex)=>{
                                                return <Text style={styles.textStyle} key={`openOption_${encodeURI(item.name)}_${optionIndex}`}>
                                                    {`${optionObj.name} ${optionObj.number}`}
                                                </Text>
                                            })
                                        }</View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.trContainer}>
                                
                                
                            </View>
                        </View>
                    }
                } >
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    filterContainer: {
        flexDirection: 'row',
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 2,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scrollContainer: {
        flex: 1
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
        textAlign: 'center'
    },

    filterStyle: {
        backgroundColor: Util.grey,
        borderRadius: 50,
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 2,
        marginRight: 2,
    },
    filterTextStyle: {
        fontSize: 11,
        color: 'white'
    }
})

export default withNavigation(ItemList)
