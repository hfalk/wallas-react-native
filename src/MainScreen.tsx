import React from 'react';
import {View, Text, FlatList} from 'react-native';

import {UserCommand} from "./types";
import {fetchAllUserCommands} from "./api/UserCommands";
import UserCommandListItem from "./components/UserCommandListItem";
import ActionButton from 'react-native-action-button';

const styles = {
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F8F8F8'
    },
};

type State = {
    userCommands: UserCommand[] | null,
}

class MainScreen extends React.Component<{}, State> {

    constructor(props: {}) {
        super(props);

        this.state = {
            userCommands: null,
        };

        this.navigateToExecuteUserCommandsModal = this.navigateToExecuteUserCommandsModal.bind(this);
    }

    componentDidMount() {
        this.getAllUserCommands()
    }

    componentDidUpdate() {
        this.getAllUserCommands()
    }

    async getAllUserCommands() {
        const userCommands = await fetchAllUserCommands()
        console.log(userCommands);
        this.setState({userCommands})

    }

    navigateToExecuteUserCommandsModal() {
        this.props.navigation.navigate(
            'ExecuteUserCommands',
        )
    }

    render() {
        return (
            <View style={ styles.container }>
                <FlatList
                    data={ this.state.userCommands }
                    keyExtractor={ (item: UserCommand) => "" + item.id }
                    renderItem={({item}) => <UserCommandListItem userCommand={item}/>}
                />
                <ActionButton
                    buttonColor="rgba(231,76,60,1)"
                    onPress={ this.navigateToExecuteUserCommandsModal }
                />
            </View>
        );
    }
}

export default MainScreen