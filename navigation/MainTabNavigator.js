import React from 'react'
import { Platform } from 'react-native'
import { Icon } from 'expo'
import { 
  createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator 
} from 'react-navigation'

import Util from '../components/common/Util'
import Colors from '../constants/Colors'
import TabBarIcon from '../components/TabBarIcon'
import ItemScreen from '../screens/ItemScreen'
import FoodScreen from '../screens/FoodScreen'
import CardScreen from '../screens/CardScreen'
import WebScreen from '../screens/WebScreen'
import SettingsScreen from '../screens/SettingsScreen'

const ItemStack = createStackNavigator({
  Item: ItemScreen,
}, {
  navigationOptions: ()=>({
    tabBarLabel: 'Item',
    tabBarIcon: ({ focused }) => (
      <Icon.AntDesign
        name={'skin'}
        size={26}
        style={{ marginBottom: -3 }}
        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    ),
  })
})
const FoodStack = createStackNavigator({
  Food: FoodScreen,
}, {
  navigationOptions: ()=>({
    tabBarLabel: 'Food',
    tabBarIcon: ({ focused }) => (
      <Icon.MaterialCommunityIcons
        name={'food'}
        size={26}
        style={{ marginBottom: -3 }}
        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    ),
  })
})
const CardStack = createStackNavigator({
  Card: CardScreen,
}, {
  navigationOptions: ()=>({
    tabBarLabel: 'Card',
    tabBarIcon: ({ focused }) => (
      <Icon.MaterialCommunityIcons
        name={'cards-outline'}
        size={26}
        style={{ marginBottom: -3 }}
        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    ),
  })
})
const WebStack = createStackNavigator({
  Web: WebScreen,
}, {
  navigationOptions: ()=>({
    tabBarLabel: 'Inven',
    tabBarIcon: ({ focused }) => (
      <Icon.MaterialCommunityIcons
        name={'web'}
        size={26}
        style={{ marginBottom: -3 }}
        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    ),
  })
})


const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  FoodStack,
  ItemStack,
  CardStack,
  WebStack
}, {
  tabBarOptions: {
    labelStyle: {
      // fontSize: 12,
    },
    tabStyle: {
      // width: 100,
    },
    style: {
      // paddingTop: 20,
      // backgroundColor: Util.tabColor
    },
  }
});
