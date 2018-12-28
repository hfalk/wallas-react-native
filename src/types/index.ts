import { Moment } from 'moment'

export type UserCommand = {
    id: Number
    userId?: String
    createdTime: Moment
    startTime: Moment
    lastUpdatedTime?: Moment
    type: CommandType
    temperature: Number
    status: CommandStatus
    messageId?: String
}

export enum CommandType {
    START = 'START',
    CHANGE = 'CHANGE',
    STOP = 'STOP',
}

export enum CommandStatus {
    WAITING,
    IN_PROGRESS,
    FINISHED,
    FAILED,
}
