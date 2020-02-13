import  {EditServiceOrderScreen} from './editServiceOrder.component';
import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions";


const mapStateToProps = state => {
      
    return {
       theme:                       state.settings.theme,
       language:                    state.settings.language,
       userName:                    state.settings.userName,
       FeaturesTruck:               state.list.FeaturesTruck,
       FeaturesList:                state.list.FeaturesList,
       MechanicList:                state.list.MechanicList,
       imgList:                     state.diagnosisList.pictures_Diagnosis,
       SO_diagnosis_List:           state.serviceOrder.SO_diagnosis_List,
       DiagnosisEdition:            state.editSO.DiagnosisEdition,
       SO_Diagnosis_OffLine:        state.editSO.SO_Diagnosis_OffLine,
       SO_MechanicLabor_OffLine:    state.editSO.SO_MechanicLabor_OffLine,
       SO_Picture_OffLine:          state.editSO.SO_Picture_OffLine,
       SO_ExtraInfo_OffLine:        state.editSO.SO_ExtraInfo_OffLine
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
       
        onUpdate_LIST : (property,value) => dispatch({type: actionTypes.UPDATE_LIST ,property:property,value:value}),
        onUpdate_Service_Order:(property,value) => dispatch({type: actionTypes.UPDATE_SERVICE_ORDER  ,property:property,value:value}),
        onUpdate_EDIT_SO:(property,value) => dispatch({type: actionTypes.UPDATE_EDIT_SO  ,property:property,value:value}),
    };
  };
export default connect(mapStateToProps,mapDispatchToProps )(EditServiceOrderScreen)  ;