import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

// screens
import Login from '../screens/Login';
import Register from '../screens/Register';

// bottomTabs
import MyTabs from './BottomNavigator';
import Account from '../screens/Account';

const Stack = createStackNavigator();

const CustomNavigator = () => {
  const {isAuthenticated,isLoading,error} = useSelector((state: RootState) => state.auth)

  return (
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{title:"Login",headerShown:false}}/>
        <Stack.Screen name='Register' component={Register} options={{title:"Register",headerShown:false}}/>
        <Stack.Screen name="Main" component={MyTabs} options={{headerShown: false,}}/>
        <Stack.Screen name='Account' component={Account} options={{title:"Account"}}/>
      </Stack.Navigator>
  );
};


export default CustomNavigator;
