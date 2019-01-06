import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, DefaultTheme, Snackbar, TextInput, ThemeShape } from 'react-native-paper'
import { NavigationScreenProp, NavigationState } from 'react-navigation'

import { isSignedIn, onSignIn } from './utils/Auth'
import { colors } from './base'

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
})

type Props = {
    navigation: NavigationScreenProp<NavigationState>
}

type State = {
    username: string
    password: string
    isLoggingIn: boolean
    isSnackbarVisible: boolean
}

class LoginScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            isLoggingIn: false,
            isSnackbarVisible: false,
        }
        this.login = this.login.bind(this)
    }

    async login() {
        this.setState({ isLoggingIn: true })
        await onSignIn(this.state.username, this.state.password)
        if (await isSignedIn()) {
            this.props.navigation.navigate('Main')
        } else {
            this.setState({ isSnackbarVisible: true })
        }
        this.setState({ isLoggingIn: false })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ padding: 36 }}>
                    <TextInput
                        mode="outlined"
                        textContentType="username"
                        label="Brukernavn"
                        value={this.state.username}
                        theme={theme}
                        onChangeText={text => this.setState({ username: text })}
                    />

                    <TextInput
                        secureTextEntry
                        mode="outlined"
                        textContentType="password"
                        label="Passord"
                        value={this.state.password}
                        theme={theme}
                        onChangeText={text => this.setState({ password: text })}
                        style={{ marginVertical: 24 }}
                    />

                    <Button
                        children="Logg inn"
                        icon="lock-open"
                        mode="outlined"
                        color={colors.blue}
                        onPress={this.login}
                        loading={this.state.isLoggingIn}
                        style={{ alignSelf: 'center', borderColor: colors.blue, borderWidth: 1 }}
                    />
                </View>

                <Snackbar
                    children="Innlogging feilet"
                    duration={5000}
                    visible={this.state.isSnackbarVisible}
                    onDismiss={() => this.setState({ isSnackbarVisible: false })}
                />
            </View>
        )
    }
}

const theme: ThemeShape = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.blue,
    },
}

export default LoginScreen
