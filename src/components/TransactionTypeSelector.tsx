import { StyleSheet, View } from 'react-native'
import { SegmentedButtons, Text } from 'react-native-paper'
import React, { useState } from 'react'
import { setTransactionType } from '../reducers/homeReducer'
import { useDispatch } from 'react-redux'

type HeaderProps = React.PropsWithChildren<{
    total:boolean
}>

const transactionTypes1 = [
    {
      value: 'TOTAL',
      label: 'Total',
    },
    {
      value: 'INCOME',
      label: 'Incomes',
    },
    { value: 'EXPENSE', 
      label: 'Expenses' 
  },
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
  const [value,setValue] = useState('INCOME')

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