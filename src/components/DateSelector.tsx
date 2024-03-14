import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { Text,SegmentedButtons } from 'react-native-paper';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { setDate as setReduxDate } from '../reducers/homeReducer';
import { UseDispatch,useDispatch,useSelector } from 'react-redux';
import { RootState } from '../store';

const DateSelector = () => {
    const [value,setValue] = useState('month')
    const [hideDatePicker,setHideDatePicker] = useState(true)
    const [date, setDate] = useState(new Date());
    const {date:reduxDate,transactionType} = useSelector((state: RootState) => state.home)
    const dispath = useDispatch()

  const onDayChange = (event:DateTimePickerEvent, selectedDate:Date|undefined) => {
    const currentDate = selectedDate;
    if(currentDate !== undefined){
        setDate(currentDate);
        dispath(setReduxDate(currentDate.toLocaleDateString()))
    }
  };
  const onMonthChange = (event:DateTimePickerEvent, selectedDate:Date|undefined) => {
    const currentDate = selectedDate;
    if(currentDate !== undefined){
        setDate(currentDate);
        dispath(setReduxDate(currentDate.toLocaleDateString()))
    }
  };
  const onYearChange = (event:DateTimePickerEvent, selectedDate:Date|undefined) => {
    const currentDate = selectedDate;
    if(currentDate !== undefined){
        setDate(currentDate);
        dispath(setReduxDate(currentDate.toLocaleDateString()))
    }
  };

  useEffect(()=>{
    if(value === 'day'){
        DateTimePickerAndroid.open({
            value: date,
            onChange:onDayChange,
            mode: 'date',
            is24Hour: true,
            //display:'spinner'
        });
    }
    if(value === 'month' && !hideDatePicker){
        DateTimePickerAndroid.open({
            value: date,
            onChange:onMonthChange,
            mode: 'date',
            is24Hour: true,
            display:'spinner'
        });
    }
    if(value === 'year'){
        DateTimePickerAndroid.open({
            value: date,
            onChange:onYearChange,
            mode: 'date',
            is24Hour: true,
            display:'spinner'
        });
    }
    setHideDatePicker(false)
  },[value])


    return (
        <View>
            <View>
                <SegmentedButtons
                    value={value}
                    onValueChange={setValue}
                    buttons={[
                    {
                        value: 'day',
                        label: 'Day',
                    },
                    {
                        value: 'month',
                        label: 'Month',
                    },
                    {
                        value:'year',
                        label:'Year'
                    }
                    ]}
                />
            </View>
                <Text>{reduxDate} {transactionType}</Text>
            </View>
    );
};

export default DateSelector;
