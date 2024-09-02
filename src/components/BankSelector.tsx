import { StyleSheet, View,TouchableOpacity } from 'react-native'
import { Text,Menu,Divider,Button, Card } from 'react-native-paper';
import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../store';
import { getBankAccountNumber, getBankBalance } from '../helpers/util';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown'
import { setBankAccountId } from '../reducers/bankReducer';

export default function BankSelector() {
  const dispatch = useDispatch()
  const {bankAccounts,bankAccountId} = useSelector((state: RootState) => state.bank)
  const [visible,setVisible] = useState(false)

  React.useEffect(()=>{
    // console.log("hello")
    //dispatch(setBankAccountId(bankAccounts[0].id))
  })

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cont}>
        <View style={styles.container}>
            <View>
              <Text variant="titleMedium">Select bank account</Text>
            </View>
            <View>
              <Menu
                visible={visible}
                onDismiss={()=>setVisible(false)}
                anchor={
                  <TouchableOpacity onPress={()=>setVisible(!visible)}>
                      <FontAwesomeIcon icon={faAngleDown} size={25} style={styles.icon}/>
                  </TouchableOpacity>
                }>
                  {
                      bankAccounts.map((account)=>
                      <View key={account.id}>
                          <Menu.Item onPress={() => {
                                  setVisible(false)
                                  dispatch(setBankAccountId(account.id))
                              }} 
                              title={account.accountNumber} 
                          />
                          <Divider />
                      </View>
                      )
                  }
              </Menu>
          </View>
        </View>
      <View>
        <Text>Bank account : {bankAccountId===-1 ? "No Account Selected" : getBankAccountNumber(bankAccounts,bankAccountId)}</Text>
        <Text>Balance : {getBankBalance(bankAccounts,bankAccountId)}</Text>
      </View>
    </Card.Content>
  </Card>
    
  )
}

const styles = StyleSheet.create({
    card:{
      // marginHorizontal:8
    },
    container:{
      display:"flex",
      flexDirection:"row",
      columnGap:20
    },
    cont:{
      display:"flex",
      flexDirection:"column",
    }
})