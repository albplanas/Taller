import  {DiagnosisFileScreen} from './diagnosisFile.component';
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
       diagnosis_List:              state.diagnosisList.diagnosis_List,
       truckid_Diagnosis:           state.diagnosisList.truckid_Diagnosis,
       Opened_S_O:                  state.list.Opened_S_O,
       ExtraInfo_Diagnosis:         state.diagnosisList.ExtraInfo_Diagnosis
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
       
        onUpdate_LIST : (property,value) => dispatch({type: actionTypes.UPDATE_LIST ,property:property,value:value}),
        onUpdate_DIAGNOSIS:(property,value) => dispatch({type: actionTypes.UPDATE_DIAGNOSIS_LIST  ,property:property,value:value}),
        onClear_DIAGNOSIS:() => dispatch({type: actionTypes.UPDATE_CLEAR_DIAGNOSIS_LIST}),
    };
  };
export default connect(mapStateToProps,mapDispatchToProps )(DiagnosisFileScreen)  ;