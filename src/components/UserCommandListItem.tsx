import * as React from 'react'
import {Text, View} from 'react-native'
import {UserCommand} from "../types";
import moment from "moment-timezone";
import { Card } from 'react-native-paper';
import { SwipeRow } from 'react-native-swipe-list-view';

const styles = {
    container: {
        padding: 6,
        margin: 6,
    },

};

type Props = {
    userCommand: UserCommand
}

const UserCommandListItem = ({userCommand}: Props) => {
    return (
        <Card style={styles.container}>
            <Card.Content style={{flexDirection:'row'}}>
                <View style={{ flex: 1}}>
                    <Text>{userCommand.type}</Text>
                    <Text>{userCommand.status}</Text>
                </View>
                <Text>{moment(userCommand.startTime).format('dddd [kl.] HH:mm')}</Text>
            </Card.Content>
        </Card>
    );
};

export default UserCommandListItem
