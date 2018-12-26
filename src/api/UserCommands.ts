import {CommandType, UserCommand} from "../types";
import {utc} from "moment";

const baseUrl = 'https://api-walas.herokuapp.com';

export const endpoints = {
    userCommands: () => `${baseUrl}/commands`,
    userCommand: (id: Number) => `${baseUrl}/commands/${id}`,
};

const baseFetch = async (url: string, settings: any): Promise<any> => {
    try {
        const response = await fetch(url, {
            ...settings,
            headers: {
                ...settings.headers,
                Authorization: '...'
            }
        });
        return response
    } catch (error) {
        console.warn(`[baseFetch] [URL: ${url}]`, error)
        throw error
    }
};

export function fetchAllUserCommands(): Promise<UserCommand[]> {
    const url = endpoints.userCommands();

    return baseFetch(url, {
        method: 'GET',
    }).then((response: any): any => {
        console.log(response)
        return response.json()
    }).then((userCommand: UserCommand[]): UserCommand[] => {
        console.log(userCommand)
        return userCommand
    })
}

export function deleteUserCommand(userCommandId: Number): Promise<UserCommand[]> {
    const url = endpoints.userCommand(userCommandId);

    return baseFetch(url, {
        method: 'DELETE',
    }).then((response: UserCommand[]): UserCommand[] => {
        return response
    })
}

export function executeUserCommand(commandType: CommandType, startTime: Date, temperature?: Number): Promise<any> {
    const url = `${endpoints.userCommands()}/${commandType}`;

    return baseFetch(url, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            startTime,
            temperature,
        }),
    })
}
