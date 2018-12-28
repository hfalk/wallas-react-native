import React from 'react'
import { RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { FAB, IconButton } from 'react-native-paper'
import { SwipeListView } from 'react-native-swipe-list-view'

import { deleteUserCommand, executeUserCommand, fetchAllStatusMessages, fetchAllUserCommands } from './api/UserCommands'
import { CommandType, StatusMessage, UserCommand } from './types'
import UserCommandListItem from './components/UserCommandListItem'
import StatusHeader from './components/StatusHeader'

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F8F8F8',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 16,
        bottom: 16,
        backgroundColor: '#3399FF',
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
    userCommands: UserCommand[] | null
    isRefreshing: boolean
    isUpdatingStatusMessage: boolean
}

class MainScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            statuses: null,
            userCommands: [],
            isRefreshing: false,
            isUpdatingStatusMessage: false,
        }

        this.navigateToExecuteUserCommandsModal = this.navigateToExecuteUserCommandsModal.bind(this)
        this.onRefresh = this.onRefresh.bind(this)
        this.getAllStatusMessages = this.getAllStatusMessages.bind(this)
        this.getAllUserCommands = this.getAllUserCommands.bind(this)
        this.onUpdateStatusMessage = this.onUpdateStatusMessage.bind(this)
    }

    async componentDidMount() {
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
        this.setState({ isUpdatingStatusMessage: true })
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

    render() {
        const mostRecentStatus =
            this.state.statuses &&
            this.state.statuses.reduce((prev, current) => (prev.createdTime < current.createdTime ? current : prev))

        return (
            <View style={styles.container}>
                <StatusHeader
                    status={mostRecentStatus}
                    isUpdating={this.state.isUpdatingStatusMessage}
                    updateStatusMessage={this.onUpdateStatusMessage}
                />

                <SwipeListView
                    useFlatList
                    disableRightSwipe
                    refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />}
                    data={this.state.userCommands}
                    keyExtractor={(item: UserCommand) => '' + item.id}
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

                <FAB icon="add" color="white" style={styles.fab} onPress={this.navigateToExecuteUserCommandsModal} />
            </View>
        )
    }
}

export default MainScreen
