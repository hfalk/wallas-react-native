import * as React from 'react'
import { Text, Picker, Switch, View, ScrollView, StyleSheet } from 'react-native'
import { Card } from 'react-native-paper'
import DatePicker from 'react-native-date-picker'

import baseStyles from '../base'
import ButtonGroup from './ButtonGroup'

const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderRadius: 0,
    },
})

type Props = {
    temperatureItems: Array<React.ReactNode>
    userCommands: Array<string>
    chosenDate: Date
    chosenTemperature: number
    isDatePickerVisible: boolean
    isTemperatureVisible: boolean
    commandoSelectedIndex: number
    setDate: (date: Date) => void
    setTemperature: (temperature: number) => void
    toggleDatePicker: () => void
    setCommandOptions: (index: number) => void
}

const ExecuteUserCommandsModalBody = (props: Props) => {
    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <Card style={styles.card}>
                <Card.Content>
                    <ButtonGroup
                        onPress={props.setCommandOptions}
                        selectedIndex={props.commandoSelectedIndex}
                        buttons={props.userCommands}
                    />
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Content>
                    <Text style={baseStyles.mediumLarge}>Dato</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 6, paddingLeft: 18 }}>
                        <Text style={baseStyles.mediumText}>Med en gang</Text>
                        <Switch
                            style={{ marginLeft: 18, flex: 1 }}
                            value={!props.isDatePickerVisible}
                            onValueChange={props.toggleDatePicker}
                        />
                    </View>
                </Card.Content>
            </Card>
            {props.isDatePickerVisible ? (
                <DatePicker
                    locale="no"
                    fadeToColor="#00000000"
                    minuteInterval={15}
                    minimumDate={new Date()}
                    date={props.chosenDate}
                    onDateChange={props.setDate}
                />
            ) : null}

            {props.isTemperatureVisible ? (
                <>
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text style={baseStyles.mediumLarge}>Temperatur</Text>
                        </Card.Content>
                    </Card>
                    <Picker
                        selectedValue={props.chosenTemperature}
                        style={{ height: 50, width: 100 }}
                        onValueChange={props.setTemperature}
                    >
                        {props.temperatureItems}
                    </Picker>
                </>
            ) : null}
        </ScrollView>
    )
}

export default ExecuteUserCommandsModalBody
