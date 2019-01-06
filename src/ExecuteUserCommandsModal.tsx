import React from 'react'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'

import { temperatures, temperatureItems } from './base'
import { CommandType } from './types'
import { executeUserCommand } from './api/UserCommands'
import ExecuteUserCommandsModalBody from './components/ExecuteUserCommandsModalBody'
import FlatCard from './components/FlatCard'

const userCommands = ['Start', 'Endre temp', 'Stop']

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F8F8F8',
    },
    line: {
        width: '100%',
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,
    },
})

type Props = {
    navigation: NavigationScreenProp<NavigationState>
}

type State = {
    chosenDate: Date
    chosenTemperature: number
    isDatePickerVisible: boolean
    isTemperatureVisible: boolean
    commandoSelectedIndex: number
}

class ExecuteUserCommandsModal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            chosenDate: new Date(),
            chosenTemperature: temperatures[0],
            isDatePickerVisible: true,
            isTemperatureVisible: true,
            commandoSelectedIndex: 0,
        }

        this.setDate = this.setDate.bind(this)
        this.setTemperature = this.setTemperature.bind(this)
        this.toggleDatePicker = this.toggleDatePicker.bind(this)
        this.setCommandOptions = this.setCommandOptions.bind(this)
        this.executeUserCommands = this.executeUserCommands.bind(this)
    }

    setDate(newDate: Date) {
        this.setState({ chosenDate: newDate })
    }

    setTemperature(newTemperature: number) {
        this.setState({ chosenTemperature: newTemperature })
    }

    toggleDatePicker() {
        this.setState(prevState => ({
            isDatePickerVisible: !prevState.isDatePickerVisible,
            chosenDate: new Date(),
        }))
    }

    setCommandOptions(index: number) {
        console.log(index)
        const isTemperatureVisible = index in [0, 2]
        console.log(isTemperatureVisible)
        this.setState({
            isTemperatureVisible,
            commandoSelectedIndex: index,
        })
    }

    async executeUserCommands() {
        const userCommandString = userCommands[this.state.commandoSelectedIndex]

        const userCommand =
            userCommandString === 'Start'
                ? CommandType.START
                : userCommandString === 'Stop'
                ? CommandType.STOP
                : CommandType.CHANGE

        try {
            const response = await executeUserCommand(userCommand, this.state.chosenDate, this.state.chosenTemperature)
            console.log(response)
        } catch (e) {
            console.log('Failed with error:', JSON.stringify(e))
        }

        this.props.navigation.state.params.getAllUserCommands()
        this.navigateToMainScreen()
    }

    navigateToMainScreen() {
        this.props.navigation.navigate('Main')
    }

    render() {
        return (
            <View style={styles.container}>
                <ExecuteUserCommandsModalBody
                    temperatureItems={temperatureItems(temperatures)}
                    userCommands={userCommands}
                    chosenDate={this.state.chosenDate}
                    chosenTemperature={this.state.chosenTemperature}
                    isDatePickerVisible={this.state.isDatePickerVisible}
                    isTemperatureVisible={this.state.isTemperatureVisible}
                    commandoSelectedIndex={this.state.commandoSelectedIndex}
                    setDate={this.setDate}
                    setTemperature={this.setTemperature}
                    toggleDatePicker={this.toggleDatePicker}
                    setCommandOptions={this.setCommandOptions}
                />

                <View style={styles.line} />

                <FlatCard style={{ alignItems: 'center' }}>
                    <Button
                        mode="text"
                        color="#3399FF"
                        icon={this.state.isDatePickerVisible ? 'save' : 'send'}
                        onPress={this.executeUserCommands}
                    >
                        {this.state.isDatePickerVisible ? 'Lagre' : 'Send'}
                    </Button>
                </FlatCard>
            </View>
        )
    }
}

export default ExecuteUserCommandsModal
