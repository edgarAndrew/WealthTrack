import { StyleSheet, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Text } from 'react-native-paper';

type NavigationProps = NativeStackScreenProps<RootStackParamList,'Account'>

// if you want children prop
// type HeaderProps = NavigationProps & React.PropsWithChildren<{
//   title:string
// }>

export default function Account({navigation}:NavigationProps) {
  return (
    <View>
      {/* <Header title='Profile' navigation={navigation}/> */}
      <Text>Account</Text>
    </View>
  )
}

const styles = StyleSheet.create({})