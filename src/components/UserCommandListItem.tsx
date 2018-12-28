import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-paper'
import moment from 'moment-timezone'

import { UserCommand } from '../types'

const styles = StyleSheet.create({
    container: {
        padding: 6,
        margin: 6,
    },
})

type Props = {
    userCommand: UserCommand
}

const UserCommandListItem = ({ userCommand }: Props) => {
    return (
        <Card style={styles.container}>
            <Card.Content style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Text>{userCommand.type}</Text>
                    <Text>{userCommand.status}</Text>
                </View>
                <Text>{moment(userCommand.startTime).format('dddd [kl.] HH:mm')}</Text>
            </Card.Content>
        </Card>
    )
}

export default UserCommandListItem
