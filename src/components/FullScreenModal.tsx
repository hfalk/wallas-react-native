// @flow
import * as React from 'react'
import { View} from 'react-native'
import ModalOverlay from 'react-native-modal'

type Props = {
    isVisible: boolean,
    onClose: () => void,
    children: React.ReactNode,
    style?: any,
}

class FullScreenModal extends React.Component<Props, {}> {

    render() {
        const {
            isVisible,
            onClose,
            style,
            children,
        } = this.props;

        return (
            <ModalOverlay
                isVisible={ isVisible }
                onRequestClose={ onClose }
                onBackdropPress={ onClose }
                backdropOpacity={ 0 }
                onSwipeThreshold={ 1000 }
                hideModalContentWhileAnimating
                useNativeDriver
                style={ [
                    {
                        marginTop: 0,
                        marginHorizontal: 0,
                        marginBottom: 0,
                        flex: 1,
                    },
                    style,
                ] }
            >
                <View style={{
                    backgroundColor: 'rgb(255, 255,255)',
                    width: '100%',
                    height: '100%',
                }}>
                    { children }
                </View>
            </ModalOverlay>
        )
    }
}

export default FullScreenModal
