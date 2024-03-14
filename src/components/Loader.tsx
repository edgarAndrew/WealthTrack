import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator, useTheme } from 'react-native-paper'

type LoaderProps = React.PropsWithChildren<{
    loading:boolean
}>

export default function Loader(props:LoaderProps) {
    const theme = useTheme()
    return (
    <ActivityIndicator animating={props.loading} color={theme.colors.primary} />
  )
}

const styles = StyleSheet.create({})