import { StyleSheet, View } from 'react-native'
import { TextInput,Text, Button } from 'react-native-paper'
import React,{useState,PropsWithChildren} from 'react'
import { useDispatch } from 'react-redux'
import { addBankAccount,getBankAccounts } from '../actions/bank'
import { addBudgetFailure } from '../reducers/budgetReducer'

type AddAccountProps = PropsWithChildren<{hideModal:Function}>

export default function AddAccount({hideModal}:AddAccountProps) {
  const dispatch = useDispatch()
  const [accountNumber,setAccountNumber] = useState("")
  const [balance,setBalance] = useState("")
  
  const handleSubmit = async() => {
    if(accountNumber && balance){
        await addBankAccount(dispatch,accountNumber,Number(balance))
        getBankAccounts(dispatch)
    }else
      dispatch(addBudgetFailure("Fields cannot be empty"))
    hideModal()
  }

  return (
    <View>
      <Text>Add Budget</Text>
      <View>
        <TextInput
          label="Account Number"
          mode={"outlined"}
          value={accountNumber}
          onChangeText={text => setAccountNumber(text)}
        />

        <TextInput
          keyboardType='numeric'
          label="Initial Balance"
          mode={"outlined"}
          value={balance}
          onChangeText={text => setBalance(text)}
        />
        <Button mode="elevated" onPress={handleSubmit}>Done</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})