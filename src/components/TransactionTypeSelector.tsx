import { StyleSheet, View } from 'react-native'
import { SegmentedButtons, Text } from 'react-native-paper'
import React, { useState } from 'react'
import { setTransactionType } from '../reducers/homeReducer'
import { useDispatch,useSelector } from 'react-redux'
import { RootState } from '../store';

type HeaderProps = React.PropsWithChildren<{
    total:boolean
}>

const transactionTypes1 = [
    {
      value: 'INCOME',
      label: 'Incomes',
    },
    { value: 'EXPENSE', 
      label: 'Expenses' 
    },
    {
      value: 'BOTH',
      label: 'Total',
    }
]
const transactionTypes2 = [
    {
      value: 'INCOME',
      label: 'Incomes',
    },
    { value: 'EXPENSE', 
      label: 'Expenses' 
  },
]

export default function TransactionTypeSelector({total}:HeaderProps) {
  const dispatch = useDispatch()
  const {transactionType} = useSelector((state: RootState) => state.home)
  const [value,setValue] = useState(transactionType)

  React.useEffect(()=>{
    dispatch(setTransactionType(value))
  },[value])
    
  return (
    <View>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={
            total ? transactionTypes1 : transactionTypes2
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({})