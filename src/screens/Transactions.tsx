import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

import TransactionTypeSelector from '../components/TransactionTypeSelector';
import TransactionList from '../components/TransactionList';
import TransactionBarGraph from '../components/TransactionBarGraph';

type NavigationProps = NativeStackScreenProps<RootStackParamList,'Main'>

// if you want children prop
// type HeaderProps = NavigationProps & React.PropsWithChildren<{
//   title:string
// }>

export default function Transactions({navigation}:NavigationProps) {
  return (
    <View>
      <Header title='Overview' navigation={navigation}/>
      <TransactionTypeSelector total={true}/>
      <TransactionBarGraph/>
      <TransactionList/>
    </View>
  )
}

const styles = StyleSheet.create({})