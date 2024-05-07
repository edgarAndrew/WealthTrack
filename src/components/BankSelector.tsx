import { StyleSheet, View,TouchableOpacity } from 'react-native'
import { Text,Menu,Divider } from 'react-native-paper';
import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../store';
import { getBankBalance } from '../helpers/util';
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
          <Text>Bank account : {bankAccountId===-1 ? "No Account Selected" : bankAccountId}</Text>
          <Text>Balance : {getBankBalance(bankAccounts,bankAccountId)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    icon:{
        
    }
})