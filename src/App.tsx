import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from "@react-navigation/native"
import Home from './screens/Home';
import Transactions from './screens/Transactions';
import Budgets from './screens/Budgets';
import Account from './screens/Account';
import { Image, StyleSheet } from 'react-native';


export type RootStackParamList = {
  Home: undefined,
  Transactions:undefined
  Budgets:undefined,
  Account:undefined
};

const Tab = createBottomTabNavigator<RootStackParamList>()

function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home' screenOptions={{
        tabBarActiveTintColor: '#e91e63',headerTitle:"yolo"
      }}>
      <Tab.Screen name="Home" component={Home} options={{
          headerTitle:"Home",
          tabBarLabel:'',
          tabBarIcon: () => (
            <Image source={require('./assets/home.png')} style={styles.iconStyles}/>
          )
        }}/>
      <Tab.Screen name="Transactions" component={Transactions} options={{
          tabBarLabel:'',
          tabBarIcon: () => (
            <Image source={require('./assets/transactions.png')} style={styles.iconStyles}/>
          )
        }}/>
      <Tab.Screen name="Budgets" component={Budgets} options={{
          tabBarLabel:'',
          tabBarIcon: () => (
            <Image source={require('./assets/wallet.png')} style={styles.iconStyles}/>
          )
        }}/>
      <Tab.Screen name="Account" component={Account} options={{
          tabBarLabel:'',
          tabBarIcon: () => (
            <Image source={require('./assets/account.png')} style={styles.iconStyles}/>
          ),
        }}/>
    </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  iconStyles:{
    width:25,
    height:30,
    marginTop:10
  },
  iconColor:{
    backgroundColor:"#ffffab"
  }
})

export default App;