import { TextInputProps, TouchableOpacityProperties, StyleProp, TextStyle, ViewStyle } from "react-native";

export type ProdCore = {
    prodId: string,
    name: string,
    rate: number,
}

export type ProdDTO = {
    quantity: number,
} & ProdCore;

export type UserDTO = {
    userId: string,
    userName: string,
};

export type TextInputModalProps = {
    touchableProps: TouchableOpacityProperties,
    textInputProps: TextInputProps
};

export type HeadingCompInterface = {
    headingName: string,
    headingStyle?: StyleProp<TextStyle>,
    children?: React.ReactNode,
    contentStyle?: StyleProp<ViewStyle>,
    containerStyleProp?: StyleProp<ViewStyle>,
    headingStyleProp?: StyleProp<ViewStyle>
};

export type headingPropsObj = {
    headingProps: HeadingCompInterface,
};

export type textInputPropsObj = {
    textInputProps: TextInputProps
};

export type textInputModalProps = {
    textInputModalProps: TextInputModalProps
};

export type keyProp = {
    key: string,
}

export type FragItemTextView = headingPropsObj & textInputPropsObj & keyProp;

export type FragItemAct = headingPropsObj & textInputModalProps & keyProp;

export type FragListItem = FragItemAct | FragItemTextView;

export type FragItemArray = Array<FragListItem>;

export type billingItemsProp = {
    billingItems: Array<ProdDTO>,
};

export type selectedUserProp = {
    selectedUser: UserDTO,
};

export type Voucher = billingItemsProp & selectedUserProp;