import * as React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import { colors } from '../base'

type ButtonProps = {
    buttons: Array<string>
    selectedIndex: number
    onPress: (index: number) => void
}

const ButtonGroup = ({ onPress, selectedIndex, buttons }: ButtonProps) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {buttons.map((value, index) => {
                const isSelected = selectedIndex === index

                return (
                    <Button
                        key={index}
                        children={value}
                        mode="outlined"
                        color="#3399FF"
                        style={[
                            { borderRadius: 0 },
                            { backgroundColor: isSelected ? 'white' : colors.lightGrey },
                            index === buttons.length - 1 && {
                                borderTopRightRadius: 4,
                                borderBottomRightRadius: 4,
                            },
                            index === 0 && {
                                borderTopLeftRadius: 4,
                                borderBottomLeftRadius: 4,
                            },
                        ]}
                        onPress={() => onPress(index)}
                    />
                )
            })}
        </View>
    )
}

export default ButtonGroup
