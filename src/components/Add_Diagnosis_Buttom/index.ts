import  {AddDiagnosisModal} from './Modal';
import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions";


const mapStateToProps = state => {
      
    return {
       theme:                       state.settings.theme,
       language:                    state.settings.language,
       FeaturesList:                state.list.FeaturesList,
       diagnosis_List:              state.diagnosisList.diagnosis_List,
       diagnosis_List_SO:           state.serviceOrder.diagnosis_List,
       MechanicList:                state.list.MechanicList,
       truckid_Diagnosis:           state.diagnosisList.truckid_Diagnosis,
       Opened_S_O:                  state.list.Opened_S_O,
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
       
        onUpdate_LIST : (property,value) => dispatch({type: actionTypes.UPDATE_LIST ,property:property,value:value}),
        onUpdate_DIAGNOSIS:(property,value) => dispatch({type: actionTypes.UPDATE_DIAGNOSIS_LIST  ,property:property,value:value}),
        onUpdate_DIAGNOSIS_SO:(property,value) => dispatch({type: actionTypes.UPDATE_SERVICE_ORDER  ,property:property,value:value}),
    };
  };
export default connect(mapStateToProps,mapDispatchToProps )(AddDiagnosisModal)  ;