import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import MainScreen from './MainScreen';
import ExecuteUserCommandsModal from './ExecuteUserCommandsModal';
import {Icon} from "react-native-elements";

const RootStack = createStackNavigator(
    {
        Main: {
            screen: MainScreen,
            navigationOptions: () => ({
                title: 'Wallas',
                headerBackTitle: 'Close'
            }),
        },
        ExecuteUserCommands: {
            screen: ExecuteUserCommandsModal,
            navigationOptions: () => ({
                title: `User Commands`,
            }),
        },
    },
    {
        initialRouteName: 'Main',
        headerMode: 'float',
        mode: 'modal',
        defaultNavigationOptions: {
            gesturesEnabled: false,
        },
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}
