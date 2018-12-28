import React from 'react'
import { View, TouchableOpacity, RefreshControl } from 'react-native'
import { NavigationScreenProp, NavigationState } from 'react-navigation'
import { FAB, IconButton } from 'react-native-paper'
import { SwipeListView } from 'react-native-swipe-list-view'

import { deleteUserCommand, fetchAllUserCommands } from './api/UserCommands'
import { UserCommand } from './types'
import UserCommandListItem from './components/UserCommandListItem'

const styles = {
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
}

type Props = {
    navigation: NavigationScreenProp<NavigationState>
}

type State = {
    userCommands: UserCommand[] | null
    isRefreshing: boolean
}

class MainScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            userCommands: [],
            isRefreshing: false,
        }

        this.navigateToExecuteUserCommandsModal = this.navigateToExecuteUserCommandsModal.bind(this)
        this.onRefresh = this.onRefresh.bind(this)
        this.getAllUserCommands = this.getAllUserCommands.bind(this)
    }

    componentDidMount() {
        this.getAllUserCommands()
    }

    async getAllUserCommands() {
        const userCommands = await fetchAllUserCommands()
        console.log(userCommands)
        this.setState({ userCommands })
    }

    async deleteUserCommand(userCommandId: number) {
        console.log(userCommandId)
        try {
            const response = await deleteUserCommand(userCommandId)
            console.log(response)
        } catch (e) {
            console.log('Failed with error:', JSON.stringify(e))
        }

        this.getAllUserCommands()
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

    render() {
        return (
            <View style={styles.container}>
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
