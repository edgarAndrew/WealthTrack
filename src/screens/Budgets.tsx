import { StyleSheet, View } from 'react-native'
import { Button, Text,Modal, Portal,Snackbar } from 'react-native-paper';
import React, { useEffect } from 'react'
import Header from '../components/Header'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../store';
import { getBudgets } from '../actions/budget';
import AddBudget from '../components/AddBudget';
import Loader from '../components/Loader';
import { ScrollView } from 'react-native-gesture-handler';
import BudgetCard from '../components/BudgetCard';
import UpdateBudget from '../components/UpdateBudgetModal';

type NavigationProps = NativeStackScreenProps<RootStackParamList,'Main'>

// if you want children prop
// type HeaderProps = NavigationProps & React.PropsWithChildren<{
//   title:string
// }>

export default function Budgets({navigation}:NavigationProps) {
  
  const dispatch = useDispatch()
  const {isLoading,error,message,budgets} = useSelector((state: RootState) => state.budgets)

  const [snackBarvisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMsg,setSnackbarMsg] = React.useState('')

  useEffect(()=>{
    getBudgets(dispatch)
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
      <Header title='Budgets' navigation={navigation}/>
      <View>
        <Portal>
          <Snackbar
                  visible={snackBarvisible}
                  onDismiss={()=>setSnackbarVisible(false)}
                  action={{
                    label: 'Cancel',
                    onPress: () => {
                      // Do something
                    },
                  }}>
                  {snackbarMsg}
          </Snackbar>
        </Portal>

        <Button icon="plus" mode="contained" onPress={showAddModal}>
          <Text variant={'titleMedium'} style={{color:'#fff'}}>Add Budget</Text>
        </Button>
        <Portal>
          <Modal visible={addVisible} onDismiss={hideAddModal} contentContainerStyle={containerStyle}>
            <AddBudget hideModal={hideAddModal}/>
          </Modal>
          
        </Portal>
        
        <View>
          {
            budgets.map((item)=><BudgetCard budget={item} key={item.id}/>)
          }
        
        </View>
      
      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({})