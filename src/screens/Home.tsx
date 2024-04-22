import { StyleSheet, View } from 'react-native'
import React from 'react'
import Header from '../components/Header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../store';
import { Text } from 'react-native-paper';
import { getBankAccounts,getCategoryTransactions,getAllTransactions } from '../actions/home';
import Loader from '../components/Loader';
import { setDate } from '../reducers/homeReducer';

// components
import BankSelector from '../components/BankSelector';
import TransactionTypeSelector from '../components/TransactionTypeSelector';
import HomePieChart from '../components/HomePieChart';
import TransactionList from '../components/TransactionList';

type HomeProps = NativeStackScreenProps<RootStackParamList,'Main'>

export default function Home({navigation}:HomeProps) {
  const dispatch = useDispatch()
  const {isLoading,error,date:reduxDate,transactionType,range} = useSelector((state: RootState) => state.home)
  
  React.useEffect(()=>{
    getBankAccounts(dispatch)
    dispatch(setDate(new Date().toLocaleString().slice(0,9)))
  },[])

  React.useEffect(()=>{
    getCategoryTransactions(dispatch,transactionType,reduxDate,range)
    // getAllTransactions(dispatch,transactionType,reduxDate,range)
  },[reduxDate,transactionType])

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
        <TransactionList/>
      </View>
  )
}

const styles = StyleSheet.create({})