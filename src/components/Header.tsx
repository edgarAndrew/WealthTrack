import { StyleSheet, View,Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Appbar, useTheme,Menu,Divider } from 'react-native-paper'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons/faEllipsisVertical'
import { logout } from '../reducers/authReducer'
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../App'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
type NavigationProps = NativeStackScreenProps<RootStackParamList,"Main">

type HeaderProps = NavigationProps & React.PropsWithChildren<{
    title:string
}>


export default function Header(props:HeaderProps) {
    const theme = useTheme()
    const dispatch = useDispatch()
    const [visible,setVisible] = useState(false)

    const handleLogout = () =>{
        dispatch(logout())
        AsyncStorage.removeItem('token')
        setVisible(false)
        props.navigation.navigate("Login")
    }
    
    return (
    <Appbar.Header style={{backgroundColor:theme.colors.primaryContainer}}>
       <Appbar.Content title={props.title} />
        <Menu
          visible={visible}
          onDismiss={()=>setVisible(false)}
          anchor={
            <TouchableOpacity onPress={()=>setVisible(!visible)}>
                <FontAwesomeIcon icon={faEllipsisVertical} size={25} style={styles.icon}/>
            </TouchableOpacity>
          }>
          <Menu.Item onPress={handleLogout} title="Logout" />
          <Divider />
          <Menu.Item onPress={() => {
            setVisible(false)
            props.navigation.navigate("Account")
          }} title="Settings" />
        </Menu>
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
    icon:{
        marginRight:5
    }
})