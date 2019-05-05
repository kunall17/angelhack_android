import React from 'react';
import { View, FlatList, TextInput, Alert } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { ListItem, ButtonGroup } from 'react-native-elements';

import { prodList, userList } from './constants';

import { ProdDTO, FragItemAct, FragItemTextView, FragItemArray, FragListItem, billingItemsProp, selectedUserProp } from '..';
import { HeadingComp } from './HeadingComp';
import { TextInputModal } from './TextInputModal';

type currentItemProp = {
    currentItem: ProdDTO,
}

type BillingScreenState = {
    showSelectorModal: boolean,
    showSelectUser: boolean,
} & Partial<currentItemProp>;

type BillingScreeProps = billingItemsProp & {
    onItemSelected: (args: currentItemProp) => void,
    onUserSelected: (args: selectedUserProp) => void,
    onDoneClicked: () => void
} & Partial<selectedUserProp>;

export class BillingScreen extends React.Component<BillingScreeProps, BillingScreenState> {

    state: BillingScreenState = {
        currentItem: undefined,
        showSelectorModal: false,
        showSelectUser: false,
    };

    _isFragItemAct = (args: FragListItem): args is FragItemAct => {
        return (args as FragItemAct).textInputModalProps !== undefined
    }

    _getFragListForProd = (): FragItemArray => {
        const { currentItem } = this.state;
        const getNumericValue = (value: string): number => (value) ? parseFloat(value) : 0;
        const getFragItemAct = (textInputValue: string): FragItemAct => ({
            headingProps: {
                headingName: 'Product Name',
            },
            textInputModalProps: {
                touchableProps: {
                    onPress: () => this.setState({ showSelectorModal: true })
                },
                textInputProps: { value: textInputValue }
            },
            key: 'ProdNameKey',
        })
        if (currentItem) {
            const { name, quantity, rate } = currentItem;
            const fragItemName: FragItemAct = getFragItemAct(name)
            const fragItemRate: FragItemTextView = {
                headingProps: {
                    headingName: 'Rate',
                },
                textInputProps: {
                    value: rate.toString(),
                    onChangeText: (value) => {
                        this.setState({
                            currentItem: {
                                ...currentItem,
                                rate: getNumericValue(value)
                            }
                        })
                    }
                },
                key: 'rateKey',
            };
            const fragItemQuantity: FragItemTextView = {
                headingProps: {
                    headingName: 'Quantity',
                },
                textInputProps: {
                    value: quantity.toString(),
                    onChangeText: (value) => {
                        this.setState({
                            currentItem: {
                                ...currentItem,
                                quantity: getNumericValue(value),
                            }
                        })
                    }
                },
                key: 'quantityKey'
            };
            const fragItemTotal: FragItemTextView = {
                headingProps: {
                    headingName: 'Total',
                },
                textInputProps: {
                    value: (rate * quantity).toString(),
                    editable: false,
                },
                key: 'totalKey',
            }
            return [fragItemName, fragItemQuantity, fragItemRate, fragItemTotal];
        } else {
            return [getFragItemAct('')]
        };
    };

    _getUserModal = () => {
        const { showSelectUser } = this.state;
        return <ReactNativeModal
            isVisible={showSelectUser}
            onBackButtonPress={() => { this.setState({ showSelectUser: false }) }}
        >
            <FlatList
                data={userList}
                renderItem={({ item, index }) => <ListItem
                    title={item.userName}
                    onPress={() => {
                        const { onUserSelected } = this.props;
                        onUserSelected({ selectedUser: item });
                        this.setState({ showSelectUser: false });
                    }}
                />
                }
            />
        </ReactNativeModal>
    };

    _getIProdModal = () => {
        return <ReactNativeModal
            isVisible={this.state.showSelectorModal}
            onBackButtonPress={() => { this.setState({ showSelectorModal: false }) }}
        >
            <FlatList
                data={prodList}
                renderItem={({ item, index }) => <ListItem
                    title={item.name}
                    rightTitle={item.rate.toString()}
                    onPress={() => {
                        this.setState({
                            currentItem: { ...prodList[index], quantity: 1 },
                            showSelectorModal: false
                        });
                    }}
                />
                }
            />
        </ReactNativeModal>
    }

    render() {
        const fragList = this._getFragListForProd();
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TextInputModal
                    touchableProps={{ onPress: () => this.setState({ showSelectUser: true }) }}
                    textInputProps={{
                        value: (this.props.selectedUser) ? this.props.selectedUser.userName : ''
                    }}
                />
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={fragList}
                        renderItem={({ item }) => {
                            if (this._isFragItemAct(item)) {
                                const { headingProps, textInputModalProps } = item;
                                return (
                                    <HeadingComp {...headingProps}>
                                        <TextInputModal {...textInputModalProps} />
                                    </HeadingComp>
                                )
                            } else {
                                const { headingProps, textInputProps } = item;
                                return (
                                    <HeadingComp {...headingProps}>
                                        <TextInput {...textInputProps} />
                                    </HeadingComp>
                                )
                            }
                        }}
                    />
                </View>
                <ButtonGroup
                    buttons={['Add Item', 'Done']}
                    onPress={(selectedIndex) => {
                        if (selectedIndex === 0) {
                            // Add item
                            const { currentItem } = this.state;
                            if (currentItem) {
                                const { onItemSelected } = this.props;
                                onItemSelected({ currentItem });
                                this.setState({
                                    currentItem: undefined,
                                });
                            } else {
                                Alert.alert('Please Select An Account From List');
                            }
                        } else {
                            // Done CLicked
                            const { onDoneClicked } = this.props;
                            onDoneClicked();
                        }
                    }}
                    selectedIndex={0}
                />
            </View>
        )
    }
};

