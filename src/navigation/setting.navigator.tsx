import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import  SettingScreen  from '../scenes/setting';

const Stack = createStackNavigator();

export const SettingNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.SETTING} component={SettingScreen}/>
  </Stack.Navigator>
);