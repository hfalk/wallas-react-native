import {StyleSheet} from "react-native";

const text = {
    defaults: {
        backgroundColor: 'transparent',
        color: 'black',
    },
    small: {
        fontSize: 14,
    },
    medium: {
        fontSize: 18,
    },
    mediumLarge: {
        fontSize: 22,
    },
    input: {
        fontSize: 22,
    },
    large: {
        fontSize: 26,
    },
};

export default StyleSheet.create({
    smallText: {
        ...text.defaults,
        ...text.small,
    },
    smallTextBold: {
        ...text.defaults,
        ...text.small,
        fontWeight: 'bold',
    },
    mediumText: {
        ...text.defaults,
        ...text.medium,
    },
    mediumTextBold: {
        ...text.defaults,
        ...text.medium,
        fontWeight: 'bold',
    },
    mediumLarge: {
        ...text.defaults,
        ...text.mediumLarge,
    },
    mediumLargeBold: {
        ...text.defaults,
        ...text.mediumLarge,
        fontWeight: 'bold',
    },
    largeText: {
        ...text.defaults,
        ...text.large,
    },
    largeTextBold: {
        ...text.defaults,
        ...text.large,
        fontWeight: 'bold',
    },
    italic: {
        ...text.defaults,
        ...text.medium,
        fontStyle: 'italic',
    },
})
