import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { HeadingCompInterface } from '..';

class HeadingComp extends React.Component<HeadingCompInterface> {

    render() {
        const { labelStyle, labelContainerStyle, containerStyle, inputContainerStyle } = styles;
        const { headingName, contentStyle, children, headingStyle, containerStyleProp, headingStyleProp } = this.props;
        return (
            <View style={[containerStyle, containerStyleProp]}>
                <View style={[labelContainerStyle, headingStyleProp]}>
                    <Text style={[labelStyle, headingStyle]}> {headingName} </Text>
                </View>
                <View style={[inputContainerStyle, contentStyle]}>
                    {children}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    labelStyle: { fontSize: 18, },
    labelContainerStyle: {
        marginLeft: 10,
    },
    containerStyle: {
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: 'green',
    },
    inputContainerStyle: {
        marginRight: 10,
        marginLeft: 10,
    },
})

export { HeadingComp };