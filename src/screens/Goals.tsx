import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type NavigationProps = NativeStackScreenProps<RootStackParamList,'Main'>

export default function Goals({navigation}:NavigationProps) {
  return (
    <View>
        <Header title='Goals' navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({})