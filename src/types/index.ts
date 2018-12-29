import { Moment } from 'moment'

export type UserCommand = {
    id: number
    userId?: string
    createdTime: Moment
    startTime: Moment
    lastUpdatedTime?: Moment
    type: CommandType
    temperature?: Number
    status: CommandStatus
    messageId?: string
    pushNotificationId?: string
}

export enum CommandType {
    START = 'START',
    CHANGE = 'CHANGE',
    STOP = 'STOP',
    STATUS = 'STATUS',
}

export enum CommandStatus {
    WAITING = 'WAITING',
    IN_PROGRESS = 'IN_PROGRESS',
    FINISHED = 'FINISHED',
    FAILED = 'FAILED',
}

export type StatusMessage = {
    id: string
    messageId?: string
    pushNotificationId?: string
    content: StatusMessageContent
    createdTime: Moment
}

export type StatusMessageContent = {
    message: string
    readTemp: number
    setTemp: number
    volt: number
    rawValue: string
    status: 'OK' | 'ERROR' | 'UNKNOWN'
}
