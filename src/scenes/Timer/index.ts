
import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions";

import { Clock_Component as Clock_Com } from './timer.component';

const mapStateToProps = state => {
      
    return {
       language:state.settings.language,
       userName:state.settings.userName,
       Clock_List:state.clock.Clock_List,
       current_ClockIn:state.clock.current_ClockIn,
       FeaturesTruck:state.list.FeaturesTruck,
    };
  };


  const mapDispatchToProps = dispatch => {
    return {
       
      UPDATE_Clock_LIST : (property,value) => dispatch({type: actionTypes.UPDATE_Clock_LIST,property:property,value:value}),
    };
  };
  const Clock_Component=connect(mapStateToProps,mapDispatchToProps )(Clock_Com)




export { Clock_Component };
