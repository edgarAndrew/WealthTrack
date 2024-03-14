import { StyleSheet, View,TouchableOpacity } from 'react-native'
import { Text,Menu,Divider } from 'react-native-paper';
import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../store';
import { getBankBalance } from '../helpers/util';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons/faAngleDown'
import { setBankAccountId } from '../reducers/homeReducer';

export default function BankSelector() {
    const dispatch = useDispatch()
    const {backAccounts,backAccountId,isLoading,error} = useSelector((state: RootState) => state.home)
    const [visible,setVisible] = useState(false)

    // React.useEffect


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
                backAccounts.map((account)=>
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
          <Text>Bank account : {backAccountId}</Text>
          <Text>Balance : {getBankBalance(backAccounts,backAccountId)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    icon:{
        
    }
})