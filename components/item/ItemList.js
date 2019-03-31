import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'

class ItemList extends Component {

    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        const itemList = this.props.itemList || []
        return (
            <ScrollView style={styles.scrollContainer}>
                {itemList.map((obj, index)=>{
                    return <View style={styles.componentContainer} key={`item_${encodeURI(obj.name)}_${index}`}>
                        <View style={[styles.trContainer]}>
                            <View style={[styles.tdContainer, {flex: 0.25, backgroundColor: 'grey'}]}>
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
                                        <Text style={styles.thTextStyle}>저장옵션</Text>
                                    </View>
                                    <View style={[styles.tdContainer, {flex: 0.5}]}>
                                        <Text style={styles.thTextStyle}>해제옵션</Text>
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
        )
    }
}

const styles = StyleSheet.create({
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

export default ItemList
