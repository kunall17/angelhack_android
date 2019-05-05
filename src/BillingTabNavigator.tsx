import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { BillingScreen } from './BillingScreen';
import { selectedUserProp, billingItemsProp, Voucher } from '..';
import { Alert } from 'react-native';

type BillingTabNavigatorState = Partial<selectedUserProp> & billingItemsProp;


export class BillingTabNavigator extends React.Component<{}, BillingTabNavigatorState> {

    state: BillingTabNavigatorState = {
        selectedUser: undefined,
        billingItems: []
    }

    render() {
        const { billingItems } = this.state;
        return createBottomTabNavigator({
            'BillingScreen': {
                screen: <BillingScreen
                    billingItems={billingItems}
                    onItemSelected={({ currentItem }) => {
                        this.setState({
                            billingItems: [...this.state.billingItems, currentItem]
                        })
                    }}
                    onUserSelected={({ selectedUser }) => {
                        this.setState({ selectedUser })
                    }}
                    onDoneClicked={() => {
                        const { selectedUser, billingItems } = this.state;
                        if (selectedUser) {
                            // Initaite Transaction;
                            const newVoucher: Voucher = { selectedUser, billingItems, };
                            // Send Request To Server,
                            this.setState({
                                billingItems: [],
                                selectedUser: undefined,
                            });

                        } else {
                            Alert.alert('Please Select A User');
                        }
                    }}
                />
            },
        })
    }
};