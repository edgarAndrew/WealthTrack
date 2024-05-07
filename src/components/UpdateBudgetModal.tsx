import { StyleSheet, View } from 'react-native'
import { TextInput,Text, Button } from 'react-native-paper'
import React,{useState,PropsWithChildren} from 'react'
import { useDispatch } from 'react-redux'
import { updateBudget,getBudgets } from '../actions/budget'

type UpdateBudgetProps = PropsWithChildren<{hideModal:Function,budgetName:string,budgetLimit:number,budgetId:number}>

export default function UpdateBudget({hideModal,budgetName,budgetLimit,budgetId}:UpdateBudgetProps) {
  const dispatch = useDispatch()
  const [amount,setAmount] = useState(budgetLimit.toString())
  const [budget_name,setBudgetName] = useState(budgetName)
  
  const handleSubmit = async() => {
    if(amount && budgetName){
        await updateBudget(dispatch,budgetId,budget_name,Number(amount))
        getBudgets(dispatch)
    }
    hideModal()
  }

  return (
    <View>
      <Text>Update Budget</Text>
      <View>
        <TextInput
          label="Budget Name"
          mode={"outlined"}
          value={budget_name}
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