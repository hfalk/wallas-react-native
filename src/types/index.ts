import { Moment } from 'moment'

export type UserCommand = {
    id: number
    userId?: string
    createdTime: Moment
    startTime: Moment
    lastUpdatedTime?: Moment
    type: CommandType
    temperature: Number
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
    WAITING,
    IN_PROGRESS,
    FINISHED,
    FAILED,
}

export type StatusMessage = {
    id: string
    messageId?: string
    pushNotificationId?: string
    content: StatusMessageContent
    createdTime: Moment
}

export type StatusMessageContent = {
    heaterStatus: string
    readTemp: number
    setTemp: number
    volt: number
    rawValue: string
}
