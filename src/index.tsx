import React from 'react'
import { Button } from 'react-native-paper'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import { isSignedIn, onSignOut } from './utils/Auth'
import { colors } from './base'
import ExecuteUserCommandsModal from './ExecuteUserCommandsModal'
import LoginScreen from './LoginScreen'
import MainScreen from './MainScreen'

const RootStack = (signedIn = false) =>
    createStackNavigator(
        {
            Main: {
                screen: MainScreen,
                navigationOptions: ({ navigation }: any) => ({
                    title: 'Wallas',
                    headerLeft: null,
                    headerRight: (
                        <Button
                            mode="text"
                            children="Logg ut"
                            color={colors.blue}
                            onPress={async () => {
                                navigation.navigate('Login')
                                onSignOut()
                            }}
                        />
                    ),
                    headerBackTitle: 'Close',
                }),
            },
            ExecuteUserCommands: {
                screen: ExecuteUserCommandsModal,
                navigationOptions: () => ({
                    title: `Send melding`,
                }),
            },
            Login: {
                screen: LoginScreen,
                navigationOptions: () => ({
                    title: 'Logg inn',
                    headerLeft: null,
                }),
            },
        },
        {
            initialRouteName: signedIn ? 'Main' : 'Login',
            headerMode: 'float',
            mode: 'modal',
            defaultNavigationOptions: {
                gesturesEnabled: false,
            },
        },
    )

type State = {
    isSignedIn: boolean
    checkedSignIn: boolean
}

export default class App extends React.Component<State> {
    state = {
        isSignedIn: false,
        checkedSignIn: false,
    }

    async componentDidMount() {
        const signedIn = await isSignedIn()
        console.log(signedIn)
        this.setState({
            isSignedIn: signedIn,
            checkedSignIn: true,
        })
    }

    render() {
        if (!this.state.checkedSignIn) {
            return null
        }

        const AppContainer = createAppContainer(RootStack(this.state.isSignedIn))

        return <AppContainer />
    }
}
