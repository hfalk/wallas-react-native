import * as React from 'react'
import { Button, Dialog } from 'react-native-paper'

type Props = {
    visible: boolean
    hideDialog: () => void
    executeCommand: () => void
    title: string
    children?: React.ReactNode
}

const BaseDialog = (props: Props) => {
    return (
        <Dialog visible={props.visible} onDismiss={props.hideDialog}>
            <Dialog.Title>{props.title}</Dialog.Title>
            <Dialog.Content>{props.children}</Dialog.Content>
            <Dialog.Actions>
                <Button children="Avbryt" onPress={props.hideDialog} />
                <Button children="Send" onPress={props.executeCommand} />
            </Dialog.Actions>
        </Dialog>
    )
}

export default BaseDialog
