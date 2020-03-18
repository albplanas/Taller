import  {SelectorScreen} from './SelectorType.component';
import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions";


const mapStateToProps = state => {
      
    return {
       language:                    state.settings.language,
       userName:                    state.settings.userName,
       FeaturesTruck:               state.list.FeaturesTruck,
       FeaturesList:                state.list.FeaturesList,
       MechanicList:                state.list.MechanicList,

       imgList:                     state.diagnosisList.pictures_Diagnosis,
       imgList_SO:                  state.serviceOrder.pictures_Diagnosis,

       diagnosis_List:              state.diagnosisList.diagnosis_List,
       diagnosis_List_SO:           state.serviceOrder.diagnosis_List,

       truckid_Diagnosis:           state.diagnosisList.truckid_Diagnosis,
       Opened_S_O:                  state.list.Opened_S_O,

       ExtraInfo_Diagnosis:         state.diagnosisList.ExtraInfo_Diagnosis,
       ExtraInfo_Diagnosis_SO:      state.serviceOrder.ExtraInfo_Diagnosis,

       Clock_List:                  state.clock.Clock_List,
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
       
        onUpdate_LIST : (property,value) => dispatch({type: actionTypes.UPDATE_LIST ,property:property,value:value}),
        onUpdate_DIAGNOSIS:(property,value) => dispatch({type: actionTypes.UPDATE_DIAGNOSIS_LIST  ,property:property,value:value}),
        onUpdate_DIAGNOSIS_SO:(property,value) => dispatch({type: actionTypes.UPDATE_SERVICE_ORDER  ,property:property,value:value}),
        UPDATE_Clock_LIST : (property,value) => dispatch({type: actionTypes.UPDATE_Clock_LIST,property:property,value:value}),
    };
  };
export default connect(mapStateToProps,mapDispatchToProps )(SelectorScreen)  ;