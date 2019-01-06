import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../base'

import { CommandStatus } from '../types'

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.blue,
        alignSelf: 'flex-start',
        marginTop: 12,
        marginBottom: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
    },
    text: {
        color: 'white',
        fontSize: 12,
    },
})

const UserCommandListHeader = ({ commandStatus }: { commandStatus: CommandStatus }) => {
    const title =
        commandStatus === CommandStatus.WAITING
            ? 'Venter på å bli sendt'
            : commandStatus === CommandStatus.FINISHED
            ? 'Sendt til ovn'
            : commandStatus === CommandStatus.IN_PROGRESS
            ? 'Blir sendt til server'
            : 'Sending til ovn feilet'

    return (
        <View style={styles.header}>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

export default UserCommandListHeader
