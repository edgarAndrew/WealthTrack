import { StyleSheet, View,Keyboard } from 'react-native'
import { TextInput,Text, Button } from 'react-native-paper'
import React,{useState,PropsWithChildren} from 'react'
import { useDispatch } from 'react-redux'
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { updateGoal,getGoals } from '../actions/goals'
import { updateGoalFailure } from '../reducers/goalReducer';
import { convertDateFormat } from '../helpers/util';

type UpdateGoalProps = PropsWithChildren<{hideModal:Function,goal_name:string,goal_amount:number,goal_deadline:string,goal_id:number}>

export default function UpdateGoal({hideModal,goal_name,goal_amount,goal_deadline,goal_id}:UpdateGoalProps) {
  const dispatch = useDispatch()
  const [amount,setAmount] = useState(goal_amount.toString())
  const [goalName,setGoalName] = useState(goal_name)

  const [endDate, setEndDate] = useState(new Date());
  const [goalDeadline,setGoalDeadline] = useState(goal_deadline)

  const onEndDateChange = (event:DateTimePickerEvent, selectedDate:Date|undefined) => {
    const currentDate = selectedDate;
    if(currentDate !== undefined){
        setEndDate(currentDate);
        setGoalDeadline(endDate.toLocaleDateString())
    }
  };
  
  const handleSubmit = async() => {
    if(amount && goalName && endDate){
      await updateGoal(dispatch,goal_id,goalName,Number(amount),convertDateFormat(endDate.toLocaleDateString()))
      getGoals(dispatch)
    }
    else
      dispatch(updateGoalFailure("All fields should be provided"))
    hideModal()
  }

  return (
    <View>
      <Text>Update Goal</Text>
      <View>
        <TextInput
          label="Goal name"
          mode={"outlined"}
          value={goalName}
          onChangeText={text => setGoalName(text)}
        />

        <TextInput
          keyboardType='numeric'
          label="Target Amount"
          mode={"outlined"}
          value={amount}
          onChangeText={text => setAmount(text)}
        />

        <TextInput
          label="End Date"
          mode={"outlined"}
          value={goalDeadline}
          onFocus={()=>{
            Keyboard.dismiss()
            DateTimePickerAndroid.open({
                value: endDate,
                onChange:onEndDateChange,
                mode: 'date',
                is24Hour: true,
                //display:'spinner'
            });
          }}
        />

        <Button mode="elevated" onPress={handleSubmit}>Done</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})