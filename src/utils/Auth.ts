import { AsyncStorage } from 'react-native'

import { checkIfAuthorized } from '../api/UserCommands'

export const onSignIn = async (username: string, password: string) => {
    try {
        await AsyncStorage.setItem('@Wallas:USER_NAME', username)
        await AsyncStorage.setItem('@Wallas:USER_PASS', password)
    } catch (error) {
        console.log('Sign in failed', error)
    }
}

export const onSignOut = async () => {
    try {
        await AsyncStorage.removeItem('@Wallas:USER_NAME')
        await AsyncStorage.removeItem('@Wallas:USER_PASS')
    } catch (error) {
        console.log('Sign out failed', error)
    }
}

export const isSignedIn = async () => {
    try {
        const username = await AsyncStorage.getItem('@Wallas:USER_NAME')
        const password = await AsyncStorage.getItem('@Wallas:USER_PASS')

        if (username === null || password === null) {
            return false
        }

        return await checkIfAuthorized()
    } catch (error) {
        return false
    }
}
