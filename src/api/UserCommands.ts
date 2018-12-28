import Config from 'react-native-config'
import { CommandType, StatusMessage, UserCommand } from '../types'

const baseUrl = 'https://api-walas.herokuapp.com'

export const endpoints = {
    statuses: () => `${baseUrl}/statuses`,
    userCommands: () => `${baseUrl}/commands`,
    userCommand: (id: Number) => `${baseUrl}/commands/${id}`,
}

const baseFetch = async (url: string, settings: any): Promise<any> => {
    try {
        const response = await fetch(url, {
            ...settings,
            headers: {
                ...settings.headers,
                Authorization: `${Config.API_USERNAME} ${Config.API_TOKEN}`,
            },
        })
        const responseObj = await jsonResponse(response)
        if (response.status == 200) {
            responseObj['success'] = true
        }
        return responseObj
    } catch (error) {
        console.warn(`[baseFetch] [URL: ${url}]`, error)
        return {
            success: false,
            message: error,
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

export function fetchAllStatusMessages(): Promise<StatusMessage[]> {
    const url = endpoints.statuses()

    return baseFetch(url, {
        method: 'GET',
    }).then(
        (statuses: StatusMessage[]): StatusMessage[] => {
            return statuses
        },
    )
}

export function fetchAllUserCommands(): Promise<UserCommand[]> {
    const url = endpoints.userCommands()

    return baseFetch(url, {
        method: 'GET',
    }).then(
        (userCommand: UserCommand[]): UserCommand[] => {
            return userCommand
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
