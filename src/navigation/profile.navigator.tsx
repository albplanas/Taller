import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRoute } from './app-routes';
import ProfileScreen from '../scenes/profile';
import {ServiceOrder} from "../components/Services_Orders/ServiceOrder"
import {PiecesByTruck} from "../components/Pieces/Pieces.layout"
const Stack = createStackNavigator();

export const ProfileNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name={AppRoute.PROFILE} component={ProfileScreen}/>
    <Stack.Screen name={AppRoute.SERVICE_ORDER} component={ServiceOrder}/>
    <Stack.Screen name={AppRoute.PIECES_BY_TRUCK} component={PiecesByTruck}/>
  </Stack.Navigator>
);