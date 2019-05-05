import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { BillingScreen } from '../BillingScreen';

const billingTabNavigator = createStackNavigator({
    'BillingScreen': { screen: BillingScreen },
});

export const AppContainer = createAppContainer(billingTabNavigator);