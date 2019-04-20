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
import specialIngredientList from '../common/ragnaJSON/food/food_ingredient_from.json'
const saveColor= 'rgb(230, 126, 34)'
const openColor= 'rgb(41, 128, 185)'

class FoodList extends SqlUtil {
    
    constructor(props){
        super(props)
        const nutritionKeywordList = (props.foodList||[]).reduce((entry, obj)=>{
            (obj.nutrition||[]).map((target)=>{
                const keyword = target.name
                keyword && !keyword.match(/[^a-zA-Z]/) && !entry.includes(keyword) && entry.push(keyword)
            })
            return entry
        }, []).sort()
        const saveKeywordList = (props.foodList||[]).reduce((entry, obj)=>{
            (obj.cooking||[]).concat(obj.tasting||[]).map((target)=>{
                const keyword = target.name
                keyword!='?' && !entry.includes(keyword) && entry.push(keyword)
            })
            return entry
        }, []).sort()
        this.state = {
            foodList: [],
            specialIngredientNameList: specialIngredientList.map((obj)=>{
                return obj.재료.trim()
            }),
            nutritionKeywordList,
            saveKeywordList
        }
    }

    componentDidMount(){
        const { navigation } = this.props
        this.focusListener = navigation.addListener("didFocus", async () => {
            this.isReady = false
            const foodList = await this.searchFoodList()
            let searchParam = {}
            try {
                const value = await AsyncStorage.getItem('FOOD_SEARCH')
                if (value !== null) {
                    const foodSearchObj = JSON.parse(value)
                    searchParam = {
                        cookingFilter: foodSearchObj.cookingFilter, 
                        tastingFilter: foodSearchObj.tastingFilter,
                        nutritionFilter: foodSearchObj.nutritionFilter, 
                        saveFilter: foodSearchObj.saveFilter
                    }
                }
            } catch (error) {
                // Error retrieving data
            }
            this.isReady = true
            this.setState({
                foodList: foodList,
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
            const {cookingFilter, tastingFilter, nutritionFilter, saveFilter} = this.state
            await AsyncStorage.setItem('FOOD_SEARCH', JSON.stringify({
                cookingFilter, tastingFilter,
                nutritionFilter, saveFilter
            }))
        } catch (error) {
            // Error retrieving data
        }            
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
        this.beforeUnmountSave()
        this.focusListener && this.focusListener.remove()
        this.willBlurListener && this.willBlurListener.remove()
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

    showIngredientInfo(name){
        const specialIngredient = specialIngredientList.find((obj)=>obj.재료.trim()==name.trim())
        if(!name || !specialIngredient) return
        Alert.alert(
            name,
            `${specialIngredient.획득몹}`,
            [{text: '확인'}]
        )          
    }
    
    render() {
        const { foodImages, foodIngreImages } = this.props
        const { searchValue, scrolling, cookingFilter, tastingFilter, searchEnabled } = this.state
        const nutritionKeywordList = this.state.nutritionKeywordList || []
        const saveKeywordList = this.state.saveKeywordList || []
        const nutritionFilter = this.state.nutritionFilter || []
        const saveFilter = this.state.saveFilter || []
        const specialIngredientNameList = this.state.specialIngredientNameList || []

        function checkedSaveCheck(list=[]){
            return list.reduce((entry, optionObj)=>{
                if(entry) return entry
                return !saveFilter.length? true: saveFilter.includes(optionObj.name)
            }, false)
        }
        const foodList = (this.state.foodList || [])
        .filter((obj)=>{
            if(!searchEnabled || !searchValue) return true
            return obj.name.indexOf(searchValue) != -1
        })
        .filter((obj)=>{
            if(!cookingFilter && !tastingFilter) return true
            return (cookingFilter && obj.cookingYn != 'Y' && checkedSaveCheck(obj.cooking)) 
                || (tastingFilter && obj.tastingYn != 'Y' && checkedSaveCheck(obj.tasting))
        })
        .filter((obj)=>{
            if(!nutritionFilter.length) return true
            return (obj.nutrition||[]).reduce((entry, target)=>{
                if(entry) return entry
                return nutritionFilter.includes(target.name)
            }, false)
        })
        .filter((obj)=>{
            if(!saveFilter.length) return true
            return (obj.cooking||[]).concat(obj.tasting||[]).reduce((entry, target)=>{
                if(entry) return entry
                return saveFilter.includes(target.name)
            }, false)
        })
        
        return (
            <View style={styles.container}>
                {(!this.isReady)? <Loading />:null}

                <View style={styles.filterContainer}>
                    <View style={[styles.filterStyle, {backgroundColor: Util.green}]}>
                        <TouchableOpacity onPress={()=>{this.setState({nutritionFilter: []})}}>
                            <Text style={[styles.filterTextStyle]}>영양 Reset</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} style={{marginLeft: 5}}>
                    {
                        nutritionKeywordList.map((obj)=>{
                            return <View  key={`nutritionKeyword_${obj}`}
                                        style={[styles.filterStyle, 
                                            nutritionFilter.includes(obj)? {backgroundColor: Util.filterSelected}: {}
                                        ]}>
                                <TouchableOpacity onPress={()=>{
                                    this.setState({
                                        nutritionFilter: !nutritionFilter.includes(obj)? [...nutritionFilter, obj]:
                                                    nutritionFilter.filter((filtered)=>filtered!=obj)
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
                        <TouchableOpacity onPress={()=>{this.setState({saveFilter: []})}}>
                            <Text style={[styles.filterTextStyle]}>저장 Reset</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} style={{marginLeft: 5}}>
                    {
                        saveKeywordList.map((obj)=>{
                            return <View  key={`saveKeyword_${obj}`}
                                        style={[styles.filterStyle, 
                                            saveFilter.includes(obj)? {backgroundColor: Util.filterSelected}: {}
                                        ]}>
                                <TouchableOpacity onPress={()=>{
                                    this.setState({
                                        saveFilter: !saveFilter.includes(obj)? [...saveFilter, obj]:
                                                    saveFilter.filter((filtered)=>filtered!=obj)
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
                        <CheckBox value={cookingFilter} onValueChange={()=>
                            {this.setState({cookingFilter: !cookingFilter})}} />
                        <TouchableOpacity onPress={()=>
                            {this.setState({cookingFilter: !cookingFilter})}}>
                            <Text style={[styles.thTextStyle, {color: saveColor}]}>쿠킹필요</Text>
                        </TouchableOpacity>
                        <CheckBox value={tastingFilter} onValueChange={()=>
                            {this.setState({tastingFilter: !tastingFilter})}} />
                        <TouchableOpacity onPress={()=>
                            {this.setState({tastingFilter: !tastingFilter})}}>
                            <Text style={[styles.thTextStyle, {color: openColor}]}>맛보기필요</Text>
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
                                            <View style={[styles.trContainer]}>
                                                {!foodImages[item.name.replace(/ /g,'').replace(/\[.*\]/g,'')]? null:
                                                    <View style={[styles.tdContainer, {flex: 0.2, marginRight: 5}]}>
                                                        <Image source={foodImages[item.name.replace(/ /g,'').replace(/\[.*\]/g,'')]} style={styles.itemImageStyle} />
                                                    </View>
                                                }
                                                <View style={[styles.tdContainer, {flex: 0.8}]}>
                                                    <View style={[styles.trContainer, {marginBottom: 3, alignSelf: 'flex-start'}]}>
                                                        {
                                                            isNaN(Number(item.difficult))? null:
                                                            Array.from(Array(Number(item.difficult))).map((obj, index)=>{
                                                                return <Icon.AntDesign key={`${item.name}_star_${index}`} style={{marginLeft: -3}}
                                                                            name="star" size={12} color='rgb(241, 196, 15)' />
                                                            })
                                                        }
                                                        <View style={{flex:1, marginLeft: 5}}>
                                                            <Text style={[styles.textStyle, {fontSize: 11, color: Util.grey, textAlign: 'left'}]}>
                                                                {item.type}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={[{marginBottom: 3, alignSelf: 'flex-start'}]}>
                                                        <Text style={[styles.textStyle, {fontSize: 17, fontWeight: 'bold', textAlign: 'left'}]}>{item.name}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            {
                                                (!item.nutrition || !item.nutrition.length)? null:
                                                <View style={[{alignSelf: 'flex-start'}]}>
                                                    <Text style={[styles.textStyle, {fontSize: 12, color: Util.grey, textAlign: 'left'}]}>{
                                                        '영양: '+(item.nutrition||[]).map((optionObj, optionIndex)=>{
                                                            return `${optionObj.name} ${optionObj.number||''}`
                                                        }).join(', ')
                                                    }</Text>
                                                </View>
                                            }
                                            {
                                                (!item.ingredient || !item.ingredient.length)? null:
                                                <View style={[{flex:1, flexDirection: 'row', alignSelf: 'flex-start', alignItems:'center'}]}>
                                                    <Text style={[styles.textStyle, {fontSize: 12, color: Util.grey, textAlign: 'left'}]}>
                                                        {'재료: '}
                                                    </Text>
                                                    <View style={[styles.tdContainer, {alignItems: 'flex-start'}]}>
                                                        <View style={[styles.trContainer, {justifyContent: 'flex-start', flexWrap: 'wrap'}]}>{
                                                            (item.ingredient||[]).map((optionObj, optionIndex)=>
                                                                <View style={{flexDirection:'row', marginLeft: 5}} key={`food_ingredient_${optionObj.name}_${item.name}_${optionIndex}`}>
                                                                    {!foodIngreImages[optionObj.name.replace(/ /g,'').replace(/\[.*\]/g,'')]? null:
                                                                        <Image style={[styles.itemImageStyle, {width: 20, height:20}]} source={foodIngreImages[optionObj.name.replace(/ /g,'').replace(/\[.*\]/g,'')]} />
                                                                    }
                                                                    {
                                                                        !specialIngredientNameList.includes(optionObj.name.trim())? 
                                                                        <Text style={[styles.textStyle, {fontSize: 12, color: Util.grey, textAlign: 'left', fontWeight:'bold', marginLeft: 5}]}>
                                                                            {`${optionObj.name} `}
                                                                        </Text>:
                                                                        <TouchableOpacity onPress={()=>{this.showIngredientInfo(optionObj.name)}}>
                                                                            <Text style={[styles.textStyle, {fontSize: 12, color: Util.black, textAlign: 'left', fontWeight:'bold', marginLeft: 5}]}>
                                                                                {`${optionObj.name} `}
                                                                            </Text>
                                                                        </TouchableOpacity>
                                                                    }
                                                                </View>
                                                            )
                                                        }</View>
                                                    </View>
                                                </View>
                                            }
                                            {
                                                (!item.calory || !item.calory.length)? null:
                                                <View style={[{alignSelf: 'flex-start'}]}>
                                                    <Text style={[styles.textStyle, {fontSize: 12, color: Util.grey, textAlign: 'left'}]}>{
                                                        '칼로리: '+(item.calory||[]).map((optionObj, optionIndex)=>{
                                                            return `${optionObj.name} ${optionObj.number||''}`
                                                        }).join(', ')
                                                    }</Text>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                    <View style={[styles.trContainer, {marginTop: 3}]}>
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
                                                        return <Text style={[styles.textStyle, {color: Util.grey, marginLeft:5, marginRight:5},
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
                                                        return <Text style={[styles.textStyle, {color: Util.grey, marginLeft:5, marginRight:5},
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
    ...CommonStyles.commonStyles
})

export default withNavigation(FoodList)