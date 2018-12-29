import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-paper'
import moment from 'moment-timezone'

import { CommandStatus, CommandType, UserCommand } from '../types'

const styles = StyleSheet.create({
    container: {
        margin: 6,
        paddingHorizontal: 6,
        borderLeftWidth: 6,
    },
    bottomContainer: {
        paddingTop: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        color: 'grey',
        fontSize: 10,
    },
})

type Props = {
    userCommand: UserCommand
}

const UserCommandListItem = ({ userCommand }: Props) => {
    console.log(userCommand)
    const typeDict: [string, string] =
        userCommand.type === CommandType.START
            ? ['green', 'Ovnen skrus PÅ']
            : userCommand.type === CommandType.STOP
            ? ['red', 'Ovnen skrus AV']
            : userCommand.type === CommandType.CHANGE
            ? ['yellow', 'Ovnen BYTTER temperatur']
            : ['blue', 'Status blir forespurt']

    const statusDict: [string, string] =
        userCommand.status === CommandStatus.FINISHED
            ? ['green', 'Melding er sendt']
            : userCommand.status === CommandStatus.FAILED
            ? ['red', 'Melding feitled']
            : userCommand.status === CommandStatus.WAITING
                ? ['yellow', 'Melding venter på å bli sendt']
                : ['blue', 'Melding prosseseres']

    return <Card style={[styles.container, { borderLeftColor: typeDict[0] }]}>
            <Card.Content style={{ paddingBottom: 3 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Text>{typeDict[1]}</Text>
                        <Text>
                            {(userCommand.temperature && `Ny temperartur: ${userCommand.temperature}`) || ''}
                        </Text>
                    </View>
                    <Text>
                        {moment(userCommand.startTime)
                            .utcOffset('+0200')
                            .format('dddd [kl.] HH:mm')}
                    </Text>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.text}>
                        Dato: {moment(userCommand.startTime)
                            .utcOffset('+0200')
                            .format('DD.MM.YYYY')}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 8, height: 8, borderRadius: 8 / 2, backgroundColor: statusDict[0], marginRight: 6 }} />
                        <Text style={styles.text}>{statusDict[1]}</Text>
                    </View>
                </View>
            </Card.Content>
        </Card>
}

export default UserCommandListItem
