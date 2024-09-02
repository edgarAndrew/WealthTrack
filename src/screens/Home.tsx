import { ScrollView, StyleSheet, View,ImageBackground } from 'react-native'
import React,{useState} from 'react'
import Header from '../components/Header';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useDispatch,useSelector } from 'react-redux';
import { RootState } from '../store';
import { getBankAccounts} from '../actions/bank';
import { setDate,setTransactionType } from '../reducers/homeReducer';
import { useTheme } from 'react-native-paper';
import { Card } from 'react-native-paper';

// components
import BankSelector from '../components/BankSelector';
import TransactionTypeSelector from '../components/TransactionTypeSelector';
import HomePieChart from '../components/HomePieChart';
import TransactionList from '../components/TransactionList';
import { theme } from '../core/theme';

type HomeProps = NativeStackScreenProps<RootStackParamList,'Main'>

export default function Home({navigation}:HomeProps) {
  const dispatch = useDispatch()
  const theme = useTheme()
  
  const [page,setPage] = useState(0)

  
  React.useEffect(()=>{
    getBankAccounts(dispatch)
    dispatch(setDate(new Date().toLocaleDateString())) // will trigger useEffect in TransactionList component
  },[])


  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={[styles.background,{backgroundColor: theme.colors.surface}]}
    >
      <ScrollView>
        {/*Ignore this error */}
        <Header title='Home' navigation={navigation}/>
        <Card style={styles.card}>
          <Card.Content style={styles.container}>
            <BankSelector/>
            <TransactionTypeSelector total={true} setPage={setPage}/>
            <HomePieChart setPage={setPage}/>
            <TransactionList page={page} setPage={setPage}/>
          </Card.Content>
        </Card>
        
        
      </ScrollView>
    </ImageBackground>
      
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    marginRight: 15,
    marginBottom:10,
    right: 0,
    bottom: 60
  },
  background: {
    flex: 1,
    width: '100%'
  },
  card:{
    marginVertical:10,
    marginHorizontal:8,
    backgroundColor:theme.colors.surface
  },
  container:{
    display:"flex",
    flexDirection:"column",
    rowGap:15
  }
})