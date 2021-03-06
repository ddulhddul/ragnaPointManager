import React, { Component } from 'react'
import { 
    View, StyleSheet, Dimensions, ActivityIndicator 
} from 'react-native'
import Util from './Util';

class Loading extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={Util.tabColor} style={styles.imageStyle} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 99999999,
    },
    imageStyle: {
        width: Dimensions.get('window').width / 3,
        resizeMode: 'contain'
    }
})

export default Loading