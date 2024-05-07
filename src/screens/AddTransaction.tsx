import { StyleSheet, View } from 'react-native'
import { TextInput,Button,Text,Snackbar, Portal} from 'react-native-paper'
import React, { useState } from 'react'
import DropDown from "react-native-paper-dropdown";
import { getCategoryOptions } from '../helpers/util';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { addTransaction } from '../actions/transaction';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../store';
import Loader from '../components/Loader';
import { setBankAccountId } from '../reducers/bankReducer';

export default function AddTransaction() {
  const [amount,setAmount] = useState("")
  const [type,setType] = useState("INCOME")
  const [category,setCategory] = useState("SALARY")
  const [budget,setBudget] = useState(false)
  const [showTypeDropDown, setShowTypeDropDown] = useState(false)
  const [showCategoryDropDown, setShowCategoryDropDown] = useState(false)
  const [showAccountDropDown, setShowAccountDropDown] = useState(false)

  const [visible, setVisible] = React.useState(false);
  const [snackbarMsg,setSnackbarMsg] = React.useState('')

  const dispatch = useDispatch()
  const {isLoading,message,error} = useSelector((state: RootState) => state.transaction)
  const {bankAccountId,bankAccounts} = useSelector((state: RootState) => state.bank)

  const [account,setAccount] = useState(-1)

  const submitHandler = ()=>{
    if(!bankAccountId || !amount || !type || !category || !budget || account===-1){
      setSnackbarMsg("Empty fields")
      setVisible(true)
      return
    }
    addTransaction(dispatch,bankAccountId,parseFloat(amount),type,category,budget)
  }

  React.useEffect(()=>{
    if(message !== ''){
      setSnackbarMsg(message)
      setVisible(true)
    }
    if(error !== ''){
      setSnackbarMsg(error)
      setVisible(true)
    }
  },[message,error])

  React.useEffect(() => {
    dispatch(setBankAccountId(account));
  }, [account]);
  
  if(isLoading)
    return (
      <View>
          <Loader loading={isLoading}/>
      </View>
    )
  else
    return (
    <View>
      <Text>Add Transaction</Text>
      <View>
        <TextInput
          keyboardType='numeric'
          label="Amount"
          mode={"outlined"}
          value={amount}
          onChangeText={text => setAmount(text)}
        />

        <DropDown
            label="Type"
            mode={"outlined"}
            visible={showTypeDropDown}
            showDropDown={() => setShowTypeDropDown(true)}
            onDismiss={() => setShowTypeDropDown(false)}
            value={type}
            setValue={setType}
            list={[
              {
                value: 'INCOME',
                label: 'Income',
              },
              { value: 'EXPENSE', 
                label: 'Expense' 
              }
            ]}
        />

        <DropDown
          label="Category"
          mode={"outlined"}
          visible={showCategoryDropDown}
          showDropDown={() => setShowCategoryDropDown(true)}
          onDismiss={() => setShowCategoryDropDown(false)}
          value={category}
          setValue={setCategory}
          list={getCategoryOptions()}
        />

        <DropDown
          label="Account"
          mode={"outlined"}
          visible={showAccountDropDown}
          showDropDown={() => setShowAccountDropDown(true)}
          onDismiss={() => setShowAccountDropDown(false)}
          value={account}
          setValue={setAccount}
          list={bankAccounts.map((item)=>{
            return {
              label:item.accountNumber,
              value:item.id
            }
          })}
        />

        {
          type === 'EXPENSE' ?
            <View>
              <BouncyCheckbox
                isChecked={budget}
                size={25}
                fillColor="red"
                disableText={true}
                onPress={() => {setBudget(!budget)}}
              />
              <Text variant="labelLarge">Include in month's budget</Text>
            </View>
            :null
        }
        
        <View>
          <Button mode="contained" onPress={submitHandler}>
            Done
          </Button>
        </View>
        <Portal>
          <Snackbar
                visible={visible}
                onDismiss={()=>setVisible(false)}
                action={{
                  label: 'Cancel',
                  onPress: () => {
                    // Do something
                  },
                }}>
                {snackbarMsg}
        </Snackbar>
        </Portal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})