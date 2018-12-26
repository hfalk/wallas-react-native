import * as React from 'react'
import {Text, View} from 'react-native'
import {UserCommand} from "../types";
import FlatCard from "./FlatCard";
import moment from "moment-timezone";

const styles = {
    container: {
        alignItems: 'flex-start',
        backgroundColor: 'white',
        padding: 18,
        flexDirection: 'row',
        marginBottom: 12,
    },

};

type Props = {
    userCommand: UserCommand
}

const UserCommandListItem = ({userCommand}: Props) => {
    return (
        <FlatCard style={ styles.container }>
            <View style={{ flex: 1}}>
                <Text>{userCommand.type}</Text>
                <Text>{userCommand.status}</Text>
            </View>
            <Text>{moment(userCommand.startTime).format('dddd [kl.] HH:mm')}</Text>
        </FlatCard>
    )
};

export default UserCommandListItem
