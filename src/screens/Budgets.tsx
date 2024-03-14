import { StyleSheet, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type NavigationProps = NativeStackScreenProps<RootStackParamList,'Main'>

// if you want children prop
// type HeaderProps = NavigationProps & React.PropsWithChildren<{
//   title:string
// }>

export default function Budgets({navigation}:NavigationProps) {
  return (
    <View>
      <Header title='Budgets' navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({})