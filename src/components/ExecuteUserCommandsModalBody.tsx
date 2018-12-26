import * as React from 'react'
import {Text, Picker, Switch, View, ScrollView} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {ButtonGroup} from "react-native-elements";
import FlatCard from "./FlatCard";
import baseStyles from "../base-style";

const styles = {
    line: {
        width: '100%',
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,
    }
};

type Props = {
    temperature: Array<number>,
    userCommands: Array<string>,
    chosenDate: Date,
    chosenTemperature: number,
    isDatePickerVisible: boolean,
    isTemperatureVisible: boolean,
    commandoSelectedIndex: number,
    setDate: (date: Date) => void,
    setTemperature: (temperature: number) => void,
    toggleDatePicker: () => void,
    setCommandOptions: (index: number) => void,
}

const ExecuteUserCommandsModalBody = (props: Props) => {
    let temperatureItems = props.temperature.map( (value) => {
        return <Picker.Item key={value} value={value} label={value + " °C"} />
    });

    return (
        <ScrollView contentContainerStyle={{alignItems: 'center'}} >
            <FlatCard>
                <ButtonGroup
                    onPress={ props.setCommandOptions }
                    selectedIndex={ props.commandoSelectedIndex }
                    buttons={ props.userCommands }
                />
            </FlatCard>

            <View style={[styles.line, { width: '90%'}]} />

            <FlatCard showBottomLine>
                <Text style={ baseStyles.mediumLarge}>Dato</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 6, paddingLeft: 18}}>
                    <Text style={baseStyles.mediumText}>Med en gang</Text>
                    <Switch
                        style={{marginLeft: 18, flex: 1}}
                        value={ !props.isDatePickerVisible }
                        onValueChange={ props.toggleDatePicker }
                    />
                </View>
            </FlatCard>
            {
                props.isDatePickerVisible ?
                    <DatePicker
                        minimumDate={new Date()}
                        minuteInterval={15}
                        locale={'no'}
                        date={props.chosenDate}
                        onDateChange={props.setDate}
                    />: null
            }

            {
                props.isTemperatureVisible ?
                    <>
                        <FlatCard showBottomLine style={{flexDirection:'row'}}>
                            <Text style={[baseStyles.mediumLarge, {flex:1}]}>Temperatur</Text>
                        </FlatCard>
                        <Picker
                            selectedValue={props.chosenTemperature}
                            style={{ height: 50, width: 100}}
                            onValueChange={props.setTemperature}
                        >
                            { temperatureItems }
                        </Picker>
                    </>: null
            }
        </ScrollView>
    );
};

export default ExecuteUserCommandsModalBody;