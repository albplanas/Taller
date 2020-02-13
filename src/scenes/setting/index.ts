import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions";

import {SettingScreen} from "./setting.component"

const mapStateToProps = state => {
 
    return {
       theme:state.settings.theme,
       language:state.settings.language,
       userName:state.settings.userName,
       MechanicList:state.list.MechanicList
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
       
        onUpdate_Settings : (property,value) => dispatch({type: actionTypes.UPDATE_SETTINGS ,property:property,value:value}),
        onUpdate_LIST : (property,value) => dispatch({type: actionTypes.UPDATE_LIST ,property:property,value:value}),
    };
  };
export default connect(mapStateToProps,mapDispatchToProps )(SettingScreen)  ;