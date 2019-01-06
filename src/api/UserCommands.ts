import { AsyncStorage } from 'react-native'

import { CommandType, StatusMessage, UserCommand } from '../types'

const baseUrl = 'https://api-walas.herokuapp.com'

export const endpoints = {
    statuses: () => `${baseUrl}/statuses`,
    userCommands: () => `${baseUrl}/commands`,
    userCommand: (id: Number) => `${baseUrl}/commands/${id}`,
}

type ResponseObject = {
    authorized: boolean
    success: boolean
    json: any
}

const baseFetch = async (url: string, settings: any): Promise<any> => {
    try {
        const username = await AsyncStorage.getItem('@Wallas:USER_NAME')
        const password = await AsyncStorage.getItem('@Wallas:USER_PASS')

        const responseObj: ResponseObject = {
            authorized: false,
            success: false,
            json: {},
        }
        const response = await fetch(url, {
            ...settings,
            headers: {
                ...settings.headers,
                Authorization: `${username} ${password}`,
            },
        })
        responseObj['json'] = await jsonResponse(response)
        responseObj['authorized'] = response.status !== 401
        if ([200, 201, 204].includes(response.status)) {
            responseObj['success'] = true
        }
        return responseObj
    } catch (error) {
        console.warn(`[baseFetch] [URL: ${url}]`, error)
        return {
            success: false,
            json: { error: error },
        }
    }
}

const jsonResponse = async (response: Response) => {
    try {
        return await response.json()
    } catch (error) {
        return {
            status: response.status,
        }
    }
}

export function checkIfAuthorized(): Promise<boolean> {
    const url = endpoints.userCommands()

    return baseFetch(url, {
        method: 'GET',
    }).then(
        (responseObj: ResponseObject): boolean => {
            return responseObj.authorized
        },
    )
}

export function fetchAllStatusMessages(): Promise<StatusMessage[]> {
    const url = endpoints.statuses()

    return baseFetch(url, {
        method: 'GET',
    }).then(
        (responseObj: ResponseObject): StatusMessage[] => {
            return responseObj.json
        },
    )
}

export function fetchAllUserCommands(): Promise<UserCommand[]> {
    const url = endpoints.userCommands()

    return baseFetch(url, {
        method: 'GET',
    }).then(
        (responseObj: ResponseObject): UserCommand[] => {
            return responseObj.json
        },
    )
}

export function deleteUserCommand(userCommandId: Number): Promise<UserCommand[]> {
    const url = endpoints.userCommand(userCommandId)

    return baseFetch(url, {
        method: 'DELETE',
    }).then(
        (response: UserCommand[]): UserCommand[] => {
            return response
        },
    )
}

export function executeUserCommand(commandType: CommandType, startTime: Date, temperature?: Number): Promise<any> {
    const url = `${endpoints.userCommands()}/${commandType}`

    return baseFetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            startTime,
            temperature,
        }),
    })
}
