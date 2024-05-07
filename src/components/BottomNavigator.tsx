import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { Image,StyleSheet } from 'react-native';

// screens
import Home from '../screens/Home';
import Transactions from '../screens/Transactions';
import Account from '../screens/Account';
import Budgets from '../screens/Budgets';
import Goals from '../screens/Goals';
import AddTransaction from '../screens/AddTransaction';


export type RootStackParamList = {
    Home: undefined,
    Transactions:undefined
    Budgets:undefined,
    Account:undefined,
    Goals:undefined
    AddTransaction:undefined
  };
  
  const Tab = createBottomTabNavigator<RootStackParamList>()

export default function MyTabs() {

  const [activeTab,setActiveTab] = useState('Home')

  return (
        <Tab.Navigator initialRouteName='Home'>
        <Tab.Screen name="Home" component={Home} options={{
            headerTitle:"Home",
            headerShown:false,
            tabBarLabel:'',
            tabBarIcon: () => (
              activeTab == "Home" ? <Image source={require('../assets/home_active.png')} style={styles.iconStyles}/>
              : <Image source={require('../assets/home.png')} style={styles.iconStyles}/>
            )
          }}
          listeners={() => ({
            tabPress: e => {
              //e.preventDefault()
              setActiveTab("Home")
            },
          })}/>
        {/* <Tab.Screen name="Transactions" component={Transactions} options={{
            tabBarLabel:'',
            headerShown:false,
            tabBarIcon: () => (
              activeTab == "Transactions" ? <Image source={require('../assets/transactions_active.png')} style={styles.iconStyles}/>
              :<Image source={require('../assets/transactions.png')} style={styles.iconStyles}/>
            )
          }} 
          listeners={() => ({
            tabPress: e => {
              //e.preventDefault()
              setActiveTab("Transactions")
            },
          })}
          /> */}
        <Tab.Screen name="AddTransaction" component={AddTransaction} options={{
            tabBarLabel:'',
            headerShown:false,
            tabBarIcon: () => (
              activeTab == "AddTransaction" ? <Image source={require('../assets/add_active.png')} style={styles.iconStyles}/>
              :<Image source={require('../assets/add.png')} style={styles.iconStyles}/>
            )
          }} 
          listeners={() => ({
            tabPress: e => {
              //e.preventDefault()
              setActiveTab("AddTransaction")
            },
          })}
          />
        <Tab.Screen name="Budgets" component={Budgets} options={{
            tabBarLabel:'',
            headerShown:false,

            tabBarIcon: () => (
              activeTab == "Budgets" ? <Image source={require('../assets/wallet_active.png')} style={styles.iconStyles}/>
              :<Image source={require('../assets/wallet.png')} style={styles.iconStyles}/>
            )
          }}
          listeners={() => ({
            tabPress: e => {
              //e.preventDefault()
              setActiveTab("Budgets")
            },
          })}
          />
          <Tab.Screen name="Goals" component={Goals} options={{
            tabBarLabel:'',
            headerShown:false,
            tabBarIcon: () => (
              activeTab == "Account" ? <Image source={require('../assets/transactions_active.png')} style={styles.iconStyles}/>
              :<Image source={require('../assets/transactions.png')} style={styles.iconStyles}/>
            ),
          }}
          listeners={() => ({
            tabPress: e => {
              //e.preventDefault()
              setActiveTab("Account")
            },
          })}
          />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    iconStyles:{
      width:32,
      height:32,
      marginTop:10
    },
    iconColor:{
      backgroundColor:"#ffffab"
    }
  })