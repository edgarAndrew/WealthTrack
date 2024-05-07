import { StyleSheet, View } from 'react-native'
import { TextInput,Text, Button } from 'react-native-paper'
import React,{useState,PropsWithChildren} from 'react'
import { useDispatch } from 'react-redux'
import { addBudget,getBudgets } from '../actions/budget'
import { addBudgetFailure } from '../reducers/budgetReducer'

type AddBudgetProps = PropsWithChildren<{hideModal:Function}>

export default function AddBudget({hideModal}:AddBudgetProps) {
  const dispatch = useDispatch()
  const [amount,setAmount] = useState("")
  const [budgetName,setBudgetName] = useState("")
  
  const handleSubmit = async() => {
    if(amount && budgetName){
        await addBudget(dispatch,budgetName,Number(amount))
        getBudgets(dispatch)
    }else
      dispatch(addBudgetFailure("Fields cannot be empty"))
    hideModal()
  }

  return (
    <View>
      <Text>Add Budget</Text>
      <View>
        <TextInput
          label="Budget Name"
          mode={"outlined"}
          value={budgetName}
          onChangeText={text => setBudgetName(text)}
        />

        <TextInput
          keyboardType='numeric'
          label="Start Amount"
          mode={"outlined"}
          value={amount}
          onChangeText={text => setAmount(text)}
        />
        <Button mode="elevated" onPress={handleSubmit}>Done</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})