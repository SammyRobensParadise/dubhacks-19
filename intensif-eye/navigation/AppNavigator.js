import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator} from 'react-navigation';
import { Platform } from 'react-native';
import MainTabNavigator from './MainTabNavigator';
import Details from '../screens/Details';
import Text from '../screens/Text'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const DetailsStack = createStackNavigator(
  {
    Details: Details,
  },
  config
);

const TextStack = createStackNavigator(
  {
    Text: Text,
  },
  config
)
export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    DetailsStack,
    TextStack
  })
);
