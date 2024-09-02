import React, { useState,PropsWithChildren } from 'react';
import { View } from 'react-native';
import { Text,SegmentedButtons } from 'react-native-paper';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { setRange, setDate as setReduxDate } from '../reducers/homeReducer';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../store';

type DateSelectorProps = PropsWithChildren<{setPage:Function}>
const DateSelector = ({setPage}:DateSelectorProps) => {
    const {date:reduxDate,transactionType,range} = useSelector((state: RootState) => state.home)

    const [value,setValue] = useState(range)
    const [date, setDate] = useState(new Date());
    const dispath = useDispatch()

  const onDayChange = (event:DateTimePickerEvent, selectedDate:Date|undefined) => {
    const currentDate = selectedDate;
    if(currentDate !== undefined){
        setPage(0)
        setDate(currentDate);
        dispath(setRange('day'))
        dispath(setReduxDate(currentDate.toLocaleDateString()))
    }
  };
  const onMonthChange = (event:DateTimePickerEvent, selectedDate:Date|undefined) => {
    const currentDate = selectedDate;
    if(currentDate !== undefined){
        setPage(0)
        setDate(currentDate);
        dispath(setRange('month'))
        dispath(setReduxDate(currentDate.toLocaleDateString()))
    }
  };
  const onYearChange = (event:DateTimePickerEvent, selectedDate:Date|undefined) => {
    const currentDate = selectedDate;
    if(currentDate !== undefined){
        setPage(0)
        setDate(currentDate);
        dispath(setRange('year'))
        dispath(setReduxDate(currentDate.toLocaleDateString()))
    }
  };

    return (
        <View>
            <View>
                <SegmentedButtons
                    value={value}
                    onValueChange={setValue}
                    buttons={[
                    {
                        value: 'day',
                        label: `Day: ${reduxDate.split("/")[0]}`,
                        onPress(event) {
                            setValue('day')
                            DateTimePickerAndroid.open({
                                value: date,
                                onChange:onDayChange,
                                mode: 'date',
                                is24Hour: true,
                                //display:'spinner'
                            });
                        },
                    },
                    {
                        value: 'month',
                        label: `Month: ${reduxDate.split("/")[1]}`,
                        onPress(event) {
                            DateTimePickerAndroid.open({
                                value: date,
                                onChange:onMonthChange,
                                mode: 'date',
                                is24Hour: true,
                                display:'spinner'
                            });
                        },
                    },
                    {
                        value:'year',
                        label:`Year: ${reduxDate.split("/")[2]}`,
                        onPress(event) {
                            DateTimePickerAndroid.open({
                                value: date,
                                onChange:onYearChange,
                                mode: 'date',
                                is24Hour: true,
                                display:'spinner'
                            });
                        },
                    }
                    ]}
                />
            </View>
        </View>
    );
};

export default DateSelector;
