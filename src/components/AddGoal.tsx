import { StyleSheet, View,Keyboard } from 'react-native'
import { TextInput,Text, Button } from 'react-native-paper'
import React,{useState,PropsWithChildren} from 'react'
import { useDispatch } from 'react-redux'
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { addGoal,getGoals } from '../actions/goals'
import { addGoalFailure } from '../reducers/goalReducer';
import { convertDateFormat } from '../helpers/util';

type AddGoalProps = PropsWithChildren<{hideModal:Function}>

export default function AddGoal({hideModal}:AddGoalProps) {
  const dispatch = useDispatch()
  const [amount,setAmount] = useState("")
  const [goalName,setGoalName] = useState("")

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onStartDateChange = (event:DateTimePickerEvent, selectedDate:Date|undefined) => {
    const currentDate = selectedDate;
    if(currentDate !== undefined){
        setStartDate(currentDate);
    }
  };
  const onEndDateChange = (event:DateTimePickerEvent, selectedDate:Date|undefined) => {
    const currentDate = selectedDate;
    if(currentDate !== undefined){
        setEndDate(currentDate);
    }
  };
  
  const handleSubmit = async() => {
    if(amount && goalName && startDate && endDate){
      await addGoal(dispatch,goalName,Number(amount),convertDateFormat(startDate.toLocaleDateString()),convertDateFormat(endDate.toLocaleDateString()))
      getGoals(dispatch)
    }
    else
      dispatch(addGoalFailure("All fields should be provided"))
    hideModal()
  }

  return (
    <View>
      <Text>Add Goal</Text>
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
          label="Start Date"
          mode={"outlined"}
          value={startDate.toLocaleDateString()}
          onFocus={()=>{
            Keyboard.dismiss()
            DateTimePickerAndroid.open({
                value: startDate,
                onChange:onStartDateChange,
                mode: 'date',
                is24Hour: true,
                //display:'spinner'
            });
          }}
        />

        <TextInput
          label="End Date"
          mode={"outlined"}
          value={endDate.toLocaleDateString()}
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