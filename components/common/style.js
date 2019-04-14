import Util from './Util'

export default {
  commonStyles: {
    container: {
        flex: 1,
        paddingTop: 30
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
    },

    filterContainer: {
        flexDirection: 'row',
        margin: 5,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 2,
        marginLeft: 0,
        marginRight: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scrollContainer: {
        flex: 1
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
    },
  }
}
