import { StyleSheet, View } from 'react-native'
import { Button, Text,Modal, Portal,Snackbar } from 'react-native-paper';
import React, { useEffect } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../store';
import Loader from '../components/Loader';
import { ScrollView } from 'react-native-gesture-handler';
import BudgetCard from '../components/BudgetCard';
import { getBankAccounts } from '../actions/bank';
import AddAccount from '../components/AddAccount';
import AccountCard from './AccountCard';

type NavigationProps = NativeStackScreenProps<RootStackParamList,'Main'>

// if you want children prop
// type HeaderProps = NavigationProps & React.PropsWithChildren<{
//   title:string
// }>

export default function Account({navigation}:NavigationProps) {
  
  const dispatch = useDispatch()
  const {bankAccounts,isLoading,error,message} = useSelector((state: RootState) => state.bank)

  const [snackBarvisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMsg,setSnackbarMsg] = React.useState('')

  useEffect(()=>{
    //getBudgets(dispatch)
    getBankAccounts(dispatch)
  },[])

  React.useEffect(()=>{
    if(message !== ''){
      setSnackbarMsg(message)
      setSnackbarVisible(true)
    }
    if(error !== ''){
      setSnackbarMsg(error)
      setSnackbarVisible(true)
    }
  },[message,error])

  const [addVisible, setAddVisible] = React.useState(false);
  const showAddModal = () => setAddVisible(true);
  const hideAddModal = () => setAddVisible(false);


  const containerStyle = {backgroundColor: 'white', padding: 20,height:200};
  
  if(isLoading)
    return (
      <View>
          <Loader loading={isLoading}/>
      </View>
  )
  else
  return (
    <ScrollView>
      <View>
        <Portal>
          <Snackbar
                  visible={snackBarvisible}
                  onDismiss={()=>setSnackbarVisible(false)}
                  action={{
                    label: 'OK',
                    onPress: () => {
                      // Do something
                    },
                  }}>
                  {snackbarMsg}
          </Snackbar>
        </Portal>

        <Button icon="plus" mode="contained" onPress={showAddModal}>
          <Text variant={'titleMedium'} style={{color:'#fff'}}>Add Bank Account</Text>
        </Button>
        <Portal>
          <Modal visible={addVisible} onDismiss={hideAddModal} contentContainerStyle={containerStyle}>
            <AddAccount hideModal={hideAddModal}/>
          </Modal>
          
        </Portal>
        
        <View>
          {
            bankAccounts.map((item)=><AccountCard account={item} key={item.id}/>)
          }
        
        </View>
      
      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({})