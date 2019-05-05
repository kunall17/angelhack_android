import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { BillingScreen } from '../BillingScreen';

const billingTabNavigator = createBottomTabNavigator({
    'BillingScreen': { screen: BillingScreen },
});

export const AppContainer = createAppContainer(billingTabNavigator);