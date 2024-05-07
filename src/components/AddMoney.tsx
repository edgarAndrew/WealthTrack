import { StyleSheet, View} from 'react-native'
import { TextInput,Text, Button } from 'react-native-paper'
import React,{useState,PropsWithChildren} from 'react'
import { useDispatch } from 'react-redux'
import { addMoneyToGoal,getGoals } from '../actions/goals'
import { updateGoalFailure } from '../reducers/goalReducer';

type UpdateGoalProps = PropsWithChildren<{hideModal:Function,goal_id:number}>

export default function AddMoney({hideModal,goal_id}:UpdateGoalProps) {
  const dispatch = useDispatch()
  const [amount,setAmount] = useState("")
  
  const handleSubmit = async() => {
    if(amount){
      await addMoneyToGoal(dispatch,goal_id,Number(amount))
      getGoals(dispatch)
    }
    else
      dispatch(updateGoalFailure("All fields should be provided"))
    hideModal()
  }

  return (
    <View>
      <Text>Add Money</Text>
      <View>
        
        <TextInput
          keyboardType='numeric'
          label="Amount"
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