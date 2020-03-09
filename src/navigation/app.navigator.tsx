import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import { HomeNavigator } from './home.navigator';
import  AddDiagnosisModal  from '../components/Add_Diagnosis_Buttom/index';
import CameraNavigator  from '../components/camera/camera.component';
import {SignUpScreen} from "../components/Signature/Signature.component"
import EditServiceOrderScreen from "../scenes/EditOrder/index"
import NewServiceOrderScreen from "../scenes/NewOrder/index";
import DiagnosisFileScreen from "../scenes/Diagnosis_File/index"
import { AppRoute } from './app-routes';
import {Clock_Component} from "../scenes/Timer/index"
import RecordClockScreen from "../scenes/Clock_Records/index"
import {Features_Board} from "../components/Add_Diagnosis_Buttom/FeatureList/Board"
import { createDrawerNavigator } from '@react-navigation/drawer';                                                                     


const Drawer = createDrawerNavigator();

export const AppNavigator = (props): React.ReactElement =>{
  const DrawerComp=(props) => <Clock_Component {...props}/>
  
  return (

    <Drawer.Navigator {...props} drawerContent={DrawerComp}>
          <Drawer.Screen name={AppRoute.HOME} component={AppNavigatorStack} />
    </Drawer.Navigator>

    );
} 

const Stack = createStackNavigator();


 const AppNavigatorStack = (props): React.ReactElement => (
  <Stack.Navigator {...props} headerMode='none'>
    <Stack.Screen name={AppRoute.HOME} component={HomeNavigator}/>
    <Stack.Screen name={AppRoute.MODAL} component={AddDiagnosisModal}/>
    <Stack.Screen name={AppRoute.CAMERA} component={CameraNavigator}/>
    <Stack.Screen name={AppRoute.SIGNATURE} component={SignUpScreen}/>
    <Stack.Screen name={AppRoute.RECORD_CLOCK} component={RecordClockScreen}/>
    <Stack.Screen name={AppRoute.EDIT_SERVICE_ORDER} component={EditServiceOrderScreen}/>
    <Stack.Screen name={AppRoute.NEW_SERVICE_ORDER} component={NewServiceOrderScreen}/>
    <Stack.Screen name={AppRoute.DIAGNOSIS_FILE} component={DiagnosisFileScreen}/>
    <Stack.Screen name={AppRoute.FEATURES_LIST} component={Features_Board}/>
  </Stack.Navigator>
);
