import { StyleSheet, View } from 'react-native'
import React from 'react'
import Header from '../components/Header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../store';
import { Text } from 'react-native-paper';
import { getBankAccounts } from '../actions/home';
import Loader from '../components/Loader';

// components
import BankSelector from '../components/BankSelector';
import TransactionTypeSelector from '../components/TransactionTypeSelector';
import HomePieChart from '../components/HomePieChart';

type HomeProps = NativeStackScreenProps<RootStackParamList,'Main'>

export default function Home({navigation}:HomeProps) {
  const dispatch = useDispatch()
  const {isLoading,error} = useSelector((state: RootState) => state.home)
  
  React.useEffect(()=>{
    getBankAccounts(dispatch)
  },[])

  return (
      isLoading ? 
      <View>
        <Loader loading={isLoading}/>
      </View> 
      :
      <View>
        {/*Ignore this error */}
        <Header title='Home' navigation={navigation}/>
        <BankSelector/>
        <TransactionTypeSelector total={false}/>
        <HomePieChart/>
      </View>
  )
}

const styles = StyleSheet.create({})