import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Card } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Entypo'
import moment from 'moment-timezone'

import { StatusMessage } from '../types'

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 6,
        margin: 0,
    },
    bottomContainer: {
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
    status: StatusMessage | null
    isUpdating: boolean
    updateStatusMessage: () => void
}

const StatusHeader = ({ status, isUpdating, updateStatusMessage }: Props) => {
    return (
        <Card style={styles.container}>
            <Card.Content style={{ paddingBottom: 0 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon.Button name="info-with-circle" color="black" backgroundColor="white" />
                    <View>
                        <Text>{`${status && status.content.heaterStatus} (${status && status.content.volt} V)`}</Text>
                        <Text>{`Nåværende temperatur: ${status && status.content.readTemp} °C`}</Text>
                        <Text>{`Satt temperatur: ${status && status.content.setTemp} °C`}</Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.text}>
                        {status && moment(status.createdTime).format('dddd [kl.] HH:mm, DD.MM')}
                    </Text>
                    <Button
                        mode="text"
                        color="#3399FF"
                        icon="update"
                        loading={isUpdating}
                        onPress={updateStatusMessage}
                    >
                        Oppdater
                    </Button>
                </View>
            </Card.Content>
        </Card>
    )
}

export default StatusHeader
