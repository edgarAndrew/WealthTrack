import { ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import Header from '../components/Header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../store';
import { getBankAccounts} from '../actions/bank';
import { setDate,setTransactionType } from '../reducers/homeReducer';

// components
import BankSelector from '../components/BankSelector';
import TransactionTypeSelector from '../components/TransactionTypeSelector';
import HomePieChart from '../components/HomePieChart';
import TransactionList from '../components/TransactionList';

type HomeProps = NativeStackScreenProps<RootStackParamList,'Main'>

export default function Home({navigation}:HomeProps) {
  const dispatch = useDispatch()
  
  const {bankAccounts,bankAccountId} = useSelector((state: RootState) => state.bank)

  
  React.useEffect(()=>{
    getBankAccounts(dispatch)
    dispatch(setDate(new Date().toLocaleDateString())) // will trigger useEffect in TransactionList component
  },[])


  return (
      <ScrollView>
        {/*Ignore this error */}
        <Header title='Home' navigation={navigation}/>
        <BankSelector/>
        <TransactionTypeSelector total={true}/>
        <HomePieChart/>
        <TransactionList/>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    marginRight: 15,
    marginBottom:10,
    right: 0,
    bottom: 60
  },
})