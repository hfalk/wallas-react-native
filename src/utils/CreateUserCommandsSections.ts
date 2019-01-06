import { UserCommand } from '../types'

type UserCommandsSections = Array<{ title: string; data: UserCommand[] }>

export const createSections = (data: UserCommand[]): UserCommandsSections => {
    const sortedUserCommandsByStatus: any = data.reduce((current: any, userCommand: UserCommand) => {
        const key = userCommand.status

        if (current[key] === undefined) current[key] = []
        key === 'WAITING' ? current[key].unshift(userCommand) : current[key].push(userCommand)

        return current
    }, {})

    const sections: UserCommandsSections = Object.keys(sortedUserCommandsByStatus).map((status: string) => ({
        title: status,
        data: sortedUserCommandsByStatus[status],
    }))
    console.log(sections)
    return sections
}
