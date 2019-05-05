import React from "react";
import { TouchableOpacity, TextInput, TouchableOpacityProperties, TextInputProps } from "react-native";
import { TextInputModalProps } from '..'

export class TextInputModal extends React.Component<TextInputModalProps> {
    render() {
        const { touchableProps, textInputProps } = this.props;
        touchableProps.style = { alignSelf: 'stretch', }
        return (
            <TouchableOpacity {...touchableProps}>
                <TextInput {...{ editable: false, ...textInputProps, }} />
            </TouchableOpacity>
        )
    }
}