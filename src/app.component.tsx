import React ,{PureComponent}from 'react';
import { YellowBox } from 'react-native';
import { NavigationNativeContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  light,
  dark,
  mapping,
} from '@eva-design/eva';
import {
  ApplicationProvider,
  IconRegistry,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation/app.navigator';
import { AppRoute } from './navigation/app-routes';
import { connect,batch } from 'react-redux';
import {getMultiple} from "./store/localStorage.js"
import * as actionTypes from "./store/actions";

const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);


class AppWindow extends PureComponent{

 
  componentDidMount(){
     
     
    
      function properValue(val,num){
          return val[num][1]===null?[]:JSON.parse(val[num][1])
      }
    getMultiple(['userName','theme','language','truckid_Diagnosis',"notes",
                  'MechanicList','FeaturesList',"diagnosis_List",'FeaturesTruck',"pictures_Diagnosis","ExtraInfo_Diagnosis","Opened_S_O",
                  'SO_Diagnosis_OffLine','SO_MechanicLabor_OffLine','SO_Picture_OffLine', "SO_ExtraInfo_OffLine"
  
  ],(val)=>{
      batch(() => {
                      this.props.onUpdate_Settings("userName",val[0][1])
                      this.props.onUpdate_Settings('theme',val[1][1])
                      this.props.onUpdate_Settings('language',val[2][1])
                      this.props.onUpdate_DIAGNOSIS('truckid_Diagnosis',val[3][1])
                      this.props.onUpdate_DIAGNOSIS('notes',val[4][1])

                      //Second Group
                      this.props.onUpdate_LIST("MechanicList",properValue(val,5))
                      this.props.onUpdate_LIST("FeaturesList",properValue(val,6))
                      this.props.onUpdate_DIAGNOSIS("diagnosis_List",properValue(val,7))
                      this.props.onUpdate_LIST("FeaturesTruck",properValue(val,8))
                      this.props.onUpdate_DIAGNOSIS("pictures_Diagnosis",properValue(val,9))
                      this.props.onUpdate_DIAGNOSIS("ExtraInfo_Diagnosis",properValue(val,10))
                      this.props.onUpdate_LIST("Opened_S_O",properValue(val,11))

                      //Third Group
                                this.props.onUPDATE_EDIT_SO("SO_Diagnosis_OffLine",properValue(val,12))
                                this.props.onUPDATE_EDIT_SO("SO_MechanicLabor_OffLine",properValue(val,13))
                                this.props.onUPDATE_EDIT_SO("SO_Picture_OffLine",properValue(val,14))
                                this.props.onUPDATE_EDIT_SO("SO_ExtraInfo_OffLine",properValue(val,15))
                      });
   
    })

  }
render(){
  
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack}/>
      <ApplicationProvider
        mapping={mapping}
        theme={this.props.theme==='dark'?dark:light}>
        <SafeAreaProvider>
          <NavigationNativeContainer>
            <AppNavigator initialRouteName={AppRoute.HOME}/>
          </NavigationNativeContainer>
        </SafeAreaProvider>
      </ApplicationProvider>
    </React.Fragment>
  );
}

} 

const mapStateToProps = state => {
      
  return {
     theme:state.settings.theme,
  };
};
const mapDispatchToProps = dispatch => {
  return {
     
      onUpdate_Settings : (property,value) => dispatch({type: actionTypes.UPDATE_SETTINGS ,property:property,value:value}),
      onUpdate_LIST : (property,value) => dispatch({type: actionTypes.UPDATE_LIST ,property:property,value:value}),
      onUpdate_DIAGNOSIS:(property,value) => dispatch({type: actionTypes.UPDATE_DIAGNOSIS_LIST  ,property:property,value:value}),
      onUPDATE_EDIT_SO :(property,value) => dispatch({type: actionTypes.UPDATE_EDIT_SO  ,property:property,value:value}),
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(AppWindow)  ;


YellowBox.ignoreWarnings([
  'RCTRootView cancelTouches',
]);
