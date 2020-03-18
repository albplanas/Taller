import  {ProfileScreen} from './profile.component';
import { connect } from 'react-redux';
import * as actionTypes from "../../store/actions";


const mapStateToProps = state => {
      
    return {
       theme:state.settings.theme,
       language:state.settings.language,
       FeaturesTruck:state.list.FeaturesTruck,
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
       
        onUpdate_LIST : (property,value) => dispatch({type: actionTypes.UPDATE_LIST ,property:property,value:value}),
        onUpdate_DIAGNOSIS:(property,value) => dispatch({type: actionTypes.UPDATE_DIAGNOSIS_LIST  ,property:property,value:value}),
    };
  };
export default connect(mapStateToProps,mapDispatchToProps )(ProfileScreen)  ;