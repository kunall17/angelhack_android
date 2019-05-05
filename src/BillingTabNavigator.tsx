import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { BillingScreen } from './BillingScreen';
import { selectedUserProp, billingItemsProp, Voucher } from '..';
import { Alert } from 'react-native';


export class BillingTabNavigator extends React.Component<{}, BillingTabNavigatorState> {

    state: BillingTabNavigatorState = {
    }

    render() {
        const { billingItems } = this.state;
        return createBottomTabNavigator({
            'BillingScreen': {
                screen: (props) => <BillingScreen
                    {...props}
                    billingItems={billingItems}
                    onItemSelected={({ currentItem }) => {

                    }}
                    onUserSelected={({ selectedUser }) => {
                    }}
                    onDoneClicked={() => {

                    }}
                />,
            }
        })
    }
};