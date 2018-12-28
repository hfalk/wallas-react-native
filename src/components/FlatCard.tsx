import * as React from 'react'
import { View } from 'react-native'

const styles = {
    container: {
        alignItems: 'flex-start',
        backgroundColor: 'white',
        padding: 18,
    },
    bottomLine: {
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,
    },
}

type Props = {
    children: React.ReactNode
    showBottomLine?: boolean
    style?: any
}

const FlatCard = ({ children, style, showBottomLine }: Props) => {
    return <View style={[styles.container, showBottomLine && styles.bottomLine, style]}>{children}</View>
}

export default FlatCard
