import React ,{Component,Fragment}from 'react';
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
import { connect } from 'react-redux';
import {getMultiple} from "./store/localStorage.js"
import * as actionTypes from "./store/actions";











class AppWindow extends Component{
 
 
  UNSAFE_componentWillMount(){

    getMultiple(['userName','theme','language','truckid_Diagnosis',"notes"],(val)=>{

      this.props.onUpdate_Settings("userName",val[0][1])
      this.props.onUpdate_Settings('theme',val[1][1])
      this.props.onUpdate_Settings('language',val[2][1])
      this.props.onUpdate_DIAGNOSIS('truckid_Diagnosis',val[3][1])
      this.props.onUpdate_DIAGNOSIS('notes',val[4][1])
     // console.log(val)
    })

    getMultiple(['MechanicList','FeaturesList',"diagnosis_List",'FeaturesTruck',"pictures_Diagnosis","ExtraInfo_Diagnosis","Opened_S_O"],(val)=>{

      this.props.onUpdate_LIST("MechanicList",val[0][1]===null?[]:JSON.parse(val[0][1]))
      this.props.onUpdate_LIST("FeaturesList",val[1][1]===null?[]:JSON.parse(val[1][1]))
      this.props.onUpdate_DIAGNOSIS("diagnosis_List",val[2][1]===null?[]:JSON.parse(val[2][1]))
      this.props.onUpdate_LIST("FeaturesTruck",val[3][1]===null?[]:JSON.parse(val[3][1]))
      this.props.onUpdate_DIAGNOSIS("pictures_Diagnosis",val[4][1]===null?[]:JSON.parse(val[4][1]))
      this.props.onUpdate_DIAGNOSIS("ExtraInfo_Diagnosis",val[5][1]===null?[]:JSON.parse(val[5][1]))
      this.props.onUpdate_LIST("Opened_S_O",val[6][1]===null?[]:JSON.parse(val[6][1]))
    // console.log("LEFG",JSON.parse(val[0][1]))
    })
    getMultiple(['SO_Diagnosis_OffLine','SO_MechanicLabor_OffLine','SO_Picture_OffLine', "SO_ExtraInfo_OffLine"],(val)=>{
               
                this.props.onUPDATE_EDIT_SO("SO_Diagnosis_OffLine",val[0][1]===null?[]:JSON.parse(val[0][1]))
                this.props.onUPDATE_EDIT_SO("SO_MechanicLabor_OffLine",val[1][1]===null?[]:JSON.parse(val[1][1]))
                this.props.onUPDATE_EDIT_SO("SO_Picture_OffLine",val[2][1]===null?[]:JSON.parse(val[2][1]))
                this.props.onUPDATE_EDIT_SO("SO_ExtraInfo_OffLine",val[3][1]===null?[]:JSON.parse(val[3][1]))
              //  console.log("val[3][1]",val[3][1])
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
     language:state.settings.language,
     userName:state.settings.userName
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


// For some reason, starting from 0.61, react-native-gesture-handler throws this warning
// https://github.com/facebook/react-native/issues/26226
YellowBox.ignoreWarnings([
  'RCTRootView cancelTouches',
]);
