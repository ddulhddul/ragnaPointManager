import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import Util from '../components/common/Util'
import TabBarIcon from '../components/TabBarIcon';
import ItemScreen from '../screens/ItemScreen';
import FoodScreen from '../screens/FoodScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const ItemStack = createStackNavigator({
  Item: ItemScreen,
}, {
  navigationOptions: ()=>({
    tabBarLabel: 'Item',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
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
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
      />
    ),
  })
})


const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

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
  LinksStack,
  SettingsStack,
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
