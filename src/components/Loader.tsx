import { StyleSheet, View,Text } from 'react-native'
import React from 'react'
import { ActivityIndicator, useTheme} from 'react-native-paper'

type LoaderProps = React.PropsWithChildren<{
    loading: boolean
}>

export default function Loader(props: LoaderProps) {
    const theme = useTheme()
    return (
        <View style={styles.container}>
            <ActivityIndicator animating={props.loading} color={theme.colors.primary} />
            <Text>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
