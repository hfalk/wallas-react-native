import Config from 'react-native-config'
import { CommandType, StatusMessage, UserCommand } from '../types'

const baseUrl = 'https://api-walas.herokuapp.com'

export const endpoints = {
    statuses: () => `${baseUrl}/statuses`,
    userCommands: () => `${baseUrl}/commands`,
    userCommand: (id: Number) => `${baseUrl}/commands/${id}`,
}

type ResponseObject = {
    success: boolean
    json: any
}

const baseFetch = async (url: string, settings: any): Promise<any> => {
    try {
        const responseObj: ResponseObject = {
            success: false,
            json: {},
        }
        const response = await fetch(url, {
            ...settings,
            headers: {
                ...settings.headers,
                Authorization: `${Config.API_USERNAME} ${Config.API_TOKEN}`,
            },
        })
        responseObj['json'] = await jsonResponse(response)
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
