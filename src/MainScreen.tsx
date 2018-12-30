import React from 'react'
import { RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { DefaultTheme, FAB, IconButton, ThemeShape } from 'react-native-paper'
import { SwipeListView } from 'react-native-swipe-list-view'
import moment from 'moment-timezone'
import Push from 'appcenter-push';

import { deleteUserCommand, executeUserCommand, fetchAllStatusMessages, fetchAllUserCommands } from './api/UserCommands'
import { CommandType, StatusMessage, UserCommand } from './types'
import UserCommandListHeader from './components/UserCommandListHeader'
import UserCommandListItem from './components/UserCommandListItem'
import StatusHeader from './components/StatusHeader'

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F8F8F8',
    },
    fab: {
        padding: 16,
    },
    deleteButtonContainer: {
        margin: 6,
        flex: 1,
        borderRadius: 4,
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'red',
    },
})

type Props = {
    navigation: NavigationScreenProp<NavigationState>
}

type State = {
    statuses: StatusMessage[] | null
    userCommands: UserCommand[]
    isRefreshing: boolean
    isUpdatingStatusMessage: boolean
    isFABOpen: boolean
}

class MainScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            statuses: null,
            userCommands: [],
            isRefreshing: false,
            isUpdatingStatusMessage: false,
            isFABOpen: false,
        }

        this.navigateToExecuteUserCommandsModal = this.navigateToExecuteUserCommandsModal.bind(this)
        this.onRefresh = this.onRefresh.bind(this)
        this.getAllStatusMessages = this.getAllStatusMessages.bind(this)
        this.getAllUserCommands = this.getAllUserCommands.bind(this)
        this.onUpdateStatusMessage = this.onUpdateStatusMessage.bind(this)
        this.executeUserCommands = this.executeUserCommands.bind(this)
    }

    async componentDidMount() {
        await Push.setListener({
            onPushNotificationReceived: async () => {
                // Use extra props in pushNotification to determine which list to update
                await this.getAllStatusMessages()
                await this.getAllUserCommands()
            }
        });

        await this.getAllStatusMessages()
        await this.getAllUserCommands()
    }

    async getAllStatusMessages() {
        try {
            const statuses = await fetchAllStatusMessages()
            this.setState({ statuses })
        } catch (e) {
            console.log('Failed with error:', JSON.stringify(e))
        }
    }

    async getAllUserCommands() {
        try {
            const userCommands = await fetchAllUserCommands()
            this.setState({ userCommands })
        } catch (e) {
            console.log('Failed with error:', JSON.stringify(e))
        }
    }

    async deleteUserCommand(userCommandId: number) {
        console.log(userCommandId)
        try {
            await deleteUserCommand(userCommandId)
            await this.getAllUserCommands()
        } catch (e) {
            console.log('Failed with error:', JSON.stringify(e))
        }
    }

    navigateToExecuteUserCommandsModal() {
        this.props.navigation.navigate('ExecuteUserCommands', {
            getAllUserCommands: this.getAllUserCommands,
        })
    }

    onRefresh() {
        this.setState({ isRefreshing: true })
        this.getAllUserCommands()
        this.setState({ isRefreshing: false })
    }

    async onUpdateStatusMessage() {
        try {
            this.setState({ isUpdatingStatusMessage: true })
            await executeUserCommand(CommandType.STATUS, new Date())
        } catch (e) {
            console.log('Failed with error:', JSON.stringify(e))
        }
        this.setState({ isUpdatingStatusMessage: false })
    }

    async executeUserCommands(userCommand: CommandType) {
        try {
            await executeUserCommand(userCommand, new Date())
            await this.getAllUserCommands()
        } catch (e) {
            console.log('Failed with error:', JSON.stringify(e))
        }
    }

    render() {
        const mostRecentStatus =
            this.state.statuses &&
            this.state.statuses.reduce((prev, current) => (prev.createdTime < current.createdTime ? current : prev))

        const sortedUserCommands = this.state.userCommands.sort((a, b) =>
            moment.utc(a.startTime).diff(moment.utc(b.startTime)),
        )

        return (
            <View style={styles.container}>
                <StatusHeader
                    status={mostRecentStatus}
                    isUpdating={this.state.isUpdatingStatusMessage}
                    updateStatusMessage={this.onUpdateStatusMessage}
                />

                <SwipeListView
                    useSectionList
                    disableRightSwipe
                    keyExtractor={(item: UserCommand) => '' + item.id}
                    refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />}
                    sections={createSections(sortedUserCommands)}
                    renderSectionHeader={({ section }: any) => <UserCommandListHeader commandStatus={section.title} />}
                    stickySectionHeadersEnabled={false}
                    renderItem={({ item }: { item: UserCommand }) => <UserCommandListItem userCommand={item} />}
                    renderHiddenItem={(data: any) => {
                        return (
                            <View style={styles.deleteButtonContainer}>
                                <TouchableOpacity onPress={() => this.deleteUserCommand(data.item.id)}>
                                    <IconButton icon="delete" color="white" style={{ width: 75 }} />
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                    rightOpenValue={-75}
                />

                <FAB.Group
                    color="white"
                    open={this.state.isFABOpen}
                    icon={this.state.isFABOpen ? 'close' : 'add'}
                    style={styles.fab}
                    theme={theme}
                    actions={[
                        {
                            icon: 'play-arrow',
                            style: { backgroundColor: 'green' },
                            label: 'Start',
                            onPress: () => this.executeUserCommands(CommandType.START),
                        },
                        {
                            icon: 'stop',
                            style: { backgroundColor: 'red' },
                            label: 'Stopp',
                            onPress: () => this.executeUserCommands(CommandType.STOP),
                        },
                        { icon: 'today', label: 'Legg til', onPress: this.navigateToExecuteUserCommandsModal },
                    ]}
                    onStateChange={({ open }) => this.setState({ isFABOpen: open })}
                />
            </View>
        )
    }
}

type UserCommandsSections = Array<{ title: string; data: UserCommand[] }>

const createSections = (data: UserCommand[]): UserCommandsSections => {
    const sortedUserCommandsByStatus: any = data.reduce(
        (current: any, userCommand: UserCommand) => {
            const key = userCommand.status

            if (current[key] === undefined) current[key] = []

            current[key].push(userCommand)
            return current
        },
        {},
    )

    const sections: UserCommandsSections = Object.keys(sortedUserCommandsByStatus)
        .map((status: string) => ({
            title: status,
            data: sortedUserCommandsByStatus[status],
        }))
        .reverse()

    return sections
}

const theme: ThemeShape = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        accent: '#3399FF',
        backdrop: '',
    },
}

export default MainScreen
