import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeNavigator } from './home.navigator';
import  AddDiagnosisModal  from '../components/Add_Diagnosis_Buttom/index';
import CameraNavigator  from '../components/camera/camera.component';
import {SignUpScreen} from "../components/Signature/Signature.component"
import EDIT_SERVICE_ORDERScreen from "../scenes/EditServiceOrder/index"
import NewServiceOrderScreen from "../scenes/NewOrder/index";
import DiagnosisFileScreen from "../scenes/Diagnosis_File/index"
import { AppRoute } from './app-routes';


const Stack = createStackNavigator();

export const AppNavigator = (props): React.ReactElement => (
  <Stack.Navigator {...props} headerMode='none'>
    <Stack.Screen name={AppRoute.HOME} component={HomeNavigator}/>
    <Stack.Screen name={AppRoute.MODAL} component={AddDiagnosisModal}/>
    <Stack.Screen name={AppRoute.CAMERA} component={CameraNavigator}/>
    <Stack.Screen name={AppRoute.SIGNATURE} component={SignUpScreen}/>
    <Stack.Screen name={AppRoute.EDIT_SERVICE_ORDER} component={EDIT_SERVICE_ORDERScreen}/>
    <Stack.Screen name={AppRoute.NEW_SERVICE_ORDER} component={NewServiceOrderScreen}/>
    <Stack.Screen name={AppRoute.DIAGNOSIS_FILE} component={DiagnosisFileScreen}/>
  </Stack.Navigator>
);
