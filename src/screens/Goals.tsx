import { StyleSheet, View,ScrollView } from 'react-native'
import { Button, Text,Modal, Portal,Snackbar } from 'react-native-paper';
import React,{useState} from 'react'
import Header from '../components/Header'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../store';
import { getGoals } from '../actions/goals';
import Loader from '../components/Loader';
import AddGoal from '../components/AddGoal';
import GoalCard from '../components/GoalCard';

type NavigationProps = NativeStackScreenProps<RootStackParamList,'Main'>

export default function Goals({navigation}:NavigationProps) {

  const dispatch = useDispatch()
  const {isLoading,error,message,goals} = useSelector((state: RootState) => state.goals)

  React.useEffect(()=>{
    getGoals(dispatch)
  },[])

  const [snackBarvisible, setSnackbarVisible] = React.useState(false);
  const [snackbarMsg,setSnackbarMsg] = React.useState('')
  const [visible, setVisible] = React.useState(false);

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

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
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
        <Header title='Goals' navigation={navigation}/>
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
        
        <Button icon="plus" mode="contained" onPress={showModal}>
          <Text variant={'titleMedium'} style={{color:'#fff'}}>Add Goal</Text>
        </Button>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <AddGoal hideModal={hideModal}/>
          </Modal>
        </Portal>

        <View>
          {
            goals.map((item)=><GoalCard goal={item} key={item.id}/>)
          }
        
        </View>
      </View>
      
    </ScrollView>
  )
}

const styles = StyleSheet.create({})