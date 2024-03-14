import { StyleSheet, View,TouchableOpacity,Image,ImageBackground,KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { TextInput, useTheme,Text,Button,Snackbar } from 'react-native-paper'
import {RootStackParamList} from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useDispatch,useSelector } from 'react-redux'
import { RootState } from '../store';

import {handleRegister} from '../actions/auth'
import Loader from '../components/Loader'


type RegisterProps = NativeStackScreenProps<RootStackParamList,'Register'>

export default function Register({navigation}: RegisterProps) {
  
  // Hooks
  const theme = useTheme()
  const dispatch = useDispatch()
  const [fname,setFname] = React.useState('')
  const [lname,setLname] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [visible, setVisible] = React.useState(false);
  const [snackbarMsg,setSnackbarMsg] = React.useState('')
  const {isAuthenticated,isLoading,error} = useSelector((state: RootState) => state.auth)

  // navigation logic
  React.useEffect(()=>{
    if(isAuthenticated)
      navigation.navigate("Main")
    if(error){
      setSnackbarMsg(error)
      setVisible(!visible)
    }
      
  },[isAuthenticated,error])

  // API call
  const handleSubmit = () =>{
    if(!fname || !lname || !email || !password){
      setSnackbarMsg("Empty fields")
      setVisible(!visible)
      return
    }
    handleRegister(dispatch,fname,lname,email,password)
  }



  return (
    <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={[styles.background,{backgroundColor: theme.colors.surface,}]}
    >
      {
        isLoading ? <Loader loading={isLoading}/> :
        <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Image source={require('../assets/logo.png')} style={styles.image} />
          <Text variant='displaySmall' style={[styles.header,{color:theme.colors.primary}]}>Wealth Track</Text>
          <View style={styles.inputCont}>
            <TextInput
                style={{backgroundColor: theme.colors.surface}}
                selectionColor={theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                label="First Name"
                returnKeyType="next"
                value={fname}
                onChangeText={(text) => setFname(text)}
                autoCapitalize="none"
                textContentType="name"
                keyboardType="default"
            />
          </View>

          <View style={styles.inputCont}>
            <TextInput
                style={{backgroundColor: theme.colors.surface}}
                selectionColor={theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                label="Last Name"
                returnKeyType="next"
                value={lname}
                onChangeText={(text) => setLname(text)}
                autoCapitalize="none"
                textContentType="name"
                keyboardType="default"
            />
          </View>

          <View style={styles.inputCont}>
              <TextInput
                style={{backgroundColor: theme.colors.surface}}
                selectionColor={theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                label="Email"
                returnKeyType="next"
                value={email}
                onChangeText={(text) => setEmail(text)}
                autoCapitalize="none"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
          </View>
          <View style={styles.inputCont}>
              <TextInput
                style={{backgroundColor: theme.colors.surface}}
                selectionColor={theme.colors.primary}
                underlineColor="transparent"
                mode="outlined"
                label="Password"
                returnKeyType="done"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                
            />
          </View>
          <Button style={styles.button} labelStyle={styles.btntext} onPress={handleSubmit} mode='contained'>Register</Button>
          <View style={styles.row}>
            <Text variant='bodyLarge'>Already have an account? </Text>
            <TouchableOpacity onPress={() => {
              navigation.goBack()
            }}>
              <Text variant='bodyLarge' style={[styles.link,{color:theme.colors.primary}]}>Login</Text>
            </TouchableOpacity>
          </View>
         </KeyboardAvoidingView>
      }
      {/* Snackbar */}
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
    width: '100%',
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
    marginVertical: 18,
    paddingVertical: 2,
  },
  btntext: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 26,
  },
  row: {
    flexDirection: 'row',
    // marginTop: 6,
  },
  forgot: {
    // fontSize: 18,
  },
  link: {
    fontWeight: 'bold',
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
  inputCont: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    
  },
})