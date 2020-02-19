/**
 * @format
 */
import React,{ useEffect } from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/app.component';

import SplashScreen from 'react-native-splash-screen'
import { createStore,combineReducers } from 'redux';
import { Provider } from 'react-redux';

import settings from './src/store/reducers/settings';
import list from './src/store/reducers/listResourses';
import diagnosisList from './src/store/reducers/diagnosis_State';
import serviceOrder from './src/store/reducers/serviceOrder';
import editServiceOrder from './src/store/reducers/editServiceOrder';

import RNBootSplash from "react-native-bootsplash";
import { StatusBar } from 'react-native';


const rootReducers = combineReducers({
  settings      :   settings   ,
  list          :   list,
  diagnosisList :   diagnosisList,
  serviceOrder  :   serviceOrder,
  editSO        :  editServiceOrder
}) 

const store = createStore(rootReducers);


const  WelcomePage =()=>{
    let init = async () => {
        // …do multiple async tasks
        console.log("INITIALITATION")
      };
     
      useEffect(() => {
        StatusBar.setHidden(true);
        init().finally(() => {
          // without fadeout: RNBootSplash.hide()
          RNBootSplash.hide();
           
        });
      }, []);
     
     
    /*useEffect(() => {
          
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
       StatusBar.setHidden(true);                   
}, []);*/
    	
   
        return <><Provider store={store}><App/></Provider></>
    
}

AppRegistry.registerComponent(appName, () => WelcomePage);




