import { StyleSheet, View,ImageBackground } from 'react-native'
import { TextInput,Button,Text,Snackbar, Portal,useTheme} from 'react-native-paper'
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
  const theme = useTheme()

  const [visible, setVisible] = React.useState(false);
  const [snackbarMsg,setSnackbarMsg] = React.useState('')

  const dispatch = useDispatch()
  const {isLoading,message,error} = useSelector((state: RootState) => state.transaction)
  const {bankAccountId,bankAccounts} = useSelector((state: RootState) => state.bank)

  const [account,setAccount] = useState(-1)

  const submitHandler = ()=>{
    if(!bankAccountId || !amount || !type || !category || account===-1){
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

  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={[styles.background,{backgroundColor: theme.colors.surface,}]}
    >
    {
      isLoading ? <View>
      <Loader loading={isLoading}/>
  </View> :
    <View style={styles.container}>
    <Text variant='displaySmall' style={[styles.header,{color:theme.colors.primary}]}>Add Transaction</Text>
    <View>
      <View style={styles.inputCont}>
        <TextInput
          keyboardType='numeric'
          label="Amount"
          mode={"outlined"}
          value={amount}
          onChangeText={text => setAmount(text)}
        />
      </View>
      
      <View style={styles.inputCont}>
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
      </View>

      
      <View style={styles.inputCont}>
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
      </View>
      
      <View style={styles.inputCont}>
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
      </View>
      

      {
        type === 'EXPENSE' ?
          <View style={styles.inputCont}>
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
        <Button style={styles.button} labelStyle={styles.btntext} mode="contained" onPress={submitHandler}>
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
    }
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    //width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  button: {
    width: '100%',
    marginVertical: 25,
    paddingVertical: 2,
  },
  btntext: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 26,
  },
  row: {
    flexDirection: 'row',
    marginTop: 8,
  },

  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  inputCont: {
    width: 300,
    marginVertical: 20,
  }
})