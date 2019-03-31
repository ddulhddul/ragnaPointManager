import React from 'react'
import { 
    CheckBox, ScrollView, View, Text, StyleSheet,
    TouchableOpacity
} from 'react-native'
import SqlUtil from '../common/SqlUtil'
import { withNavigation } from 'react-navigation'

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
            keywordList
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
        const itemList = this.state.itemList || []
        const keywordList = this.state.keywordList || []
        const filter = this.state.filter || []
        return (
            <View style={styles.container}>
                <View style={styles.filterContainer}>
                    <Text style={{marginRight: 5}}>필터</Text>
                    <ScrollView horizontal={true}>
                    {
                        keywordList.map((obj)=>{
                            return <View  key={`keyword_${obj}`}
                                        style={[filter.includes(obj)? {backgroundColor:'grey'}: {}, {margin: 5}]}>
                                <TouchableOpacity onPress={()=>{
                                    filter.includes(obj)
                                    this.setState({
                                        filter: 
                                            !filter.includes(obj)? [...filter, obj]:
                                                filter.filter((filtered)=>filtered!=obj)
                                    })
                                }}>
                                    <Text>{obj}</Text>
                                </TouchableOpacity>
                            </View>
                        })
                    }
                    </ScrollView>
                </View>
                
                <ScrollView style={styles.scrollContainer}>
                    {itemList.map((obj, index)=>{
                        return <View style={styles.componentContainer} key={`item_${encodeURI(obj.name)}_${index}`}>
                            <View style={[styles.trContainer]}>
                                <View style={[styles.tdContainer, {flex: 0.25}]}>
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
                                            <Text style={styles.textStyle}>{obj.name}</Text>
                                        </View>
                                        <View style={[styles.tdContainer, {flex: 0.5}]}>{
                                            obj.option.map((optionObj, optionIndex)=>{
                                                return <Text style={styles.textStyle} key={`option_${encodeURI(obj.name)}_${optionIndex}`}>
                                                    {`${optionObj.name} ${optionObj.number}`}
                                                </Text>
                                            })
                                        }</View>
                                    </View>
                                    <View style={styles.trContainer}>
                                        <View style={[styles.tdContainer, {flex: 0.5}]}>
                                            <View style={[styles.trContainer]}>
                                                <CheckBox value={obj.saveYn=='Y'?true:false} onValueChange={()=>this.updateSaveChecked(obj)} />
                                                <TouchableOpacity onPress={()=>this.updateSaveChecked(obj)}>
                                                    <Text style={styles.thTextStyle}>저장옵션</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={[styles.tdContainer, {flex: 0.5}]}>
                                            <View style={[styles.trContainer]}>
                                                <CheckBox value={obj.openYn=='Y'?true:false} onValueChange={()=>this.updateOpenChecked(obj)} />
                                                <TouchableOpacity onPress={()=>this.updateOpenChecked(obj)}>
                                                    <Text style={styles.thTextStyle}>해제옵션</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.trContainer}>
                                        <View style={[styles.tdContainer, {flex: 0.5}]}>{
                                            obj.savePoint.map((optionObj, optionIndex)=>{
                                                return <Text style={styles.textStyle} key={`saveOption_${encodeURI(obj.name)}_${optionIndex}`}>
                                                    {`${optionObj.name} ${optionObj.number}`}
                                                </Text>
                                            })
                                        }</View>
                                        <View style={[styles.tdContainer, {flex: 0.5}]}>{
                                            obj.openPoint.map((optionObj, optionIndex)=>{
                                                return <Text style={styles.textStyle} key={`openOption_${encodeURI(obj.name)}_${optionIndex}`}>
                                                    {`${optionObj.name} ${optionObj.number}`}
                                                </Text>
                                            })
                                        }</View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.trContainer}>
                                <View style={[styles.tdContainer, {flex: 0.3}]}>
                                    <Text style={styles.thTextStyle}>RECIPE</Text>
                                </View>
                                <View style={[styles.tdContainer, {flex: 0.7}]}>{
                                    obj.recipe.map((optionObj, optionIndex)=>{
                                        return <Text style={styles.textStyle} key={`recipe_${encodeURI(obj.name)}_${optionIndex}`}>
                                            {`${optionObj.name} ${optionObj.number}`}
                                        </Text>
                                    })
                                }</View>
                            </View>
                        </View>
                    })}
                </ScrollView>
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
        height: 50,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    scrollContainer: {
        flex: 1
    },
    componentContainer: {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        margin: 10,
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
    }
})

export default withNavigation(ItemList)
