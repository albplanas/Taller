
import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions";

import { TodoInProgressScreen as TTT } from './todo-in-progress.components';
import { TodoTabBar as TB } from './todo-tab-bar.component';
import { TodoDoneScreen as TD } from './todo-done.component';
const mapStateToProps = state => {
      
    return {
       language:state.settings.language,
       userName:state.settings.userName,
       diagnosis_List:state.diagnosisList.diagnosis_List,
       truckid_Diagnosis:state.diagnosisList.truckid_Diagnosis,
       imgList:state.diagnosisList.pictures_Diagnosis,
       FeaturesList:state.list.FeaturesList,
       FeaturesTruck:state.list.FeaturesTruck,
       Opened_S_O:state.list.Opened_S_O,
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
       
        onUpdate_LIST : (property,value) => dispatch({type: actionTypes.UPDATE_LIST ,property:property,value:value}),
        onUpdate_DIAGNOSIS:(property,value) => dispatch({type: actionTypes.UPDATE_DIAGNOSIS_LIST  ,property:property,value:value}),
        onClear_DIAGNOSIS:(value) => dispatch({type: actionTypes.UPDATE_CLEAR_DIAGNOSIS_LIST,value:value}),
    };
  };
  const TodoTabBar=connect(mapStateToProps,mapDispatchToProps )(TB)
  const TodoInProgressScreen=connect(mapStateToProps,mapDispatchToProps )(TTT)
  const TodoDoneScreen=connect(mapStateToProps,mapDispatchToProps )(TD)



export { TodoInProgressScreen };
export { TodoDoneScreen } ;
export { TodoTabBar };