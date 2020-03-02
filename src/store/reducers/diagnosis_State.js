import * as actionTypes from '../actions'; 
import {varModel} from "../../globalFunc_Use/constructionModel"
const initialState = {
   
        diagnosis_List:[],
        truckid_Diagnosis:null,
        notes:"",
        pictures_Diagnosis:[],
        ExtraInfo_Diagnosis:varModel({IdMaintenance:null,mtto_mill:"",scheduledmaint:0,ErrorInOdometer:0,explanation:""})
}
const reducer = (state = initialState, action) => {


    switch(action.type){
       
      
       case actionTypes.UPDATE_DIAGNOSIS_LIST:


                    
                        return {
                            ...state,
                            [action.property]:action.value
                        
                        
                        }   
     case actionTypes.UPDATE_CLEAR_DIAGNOSIS_LIST:


                    
                        return {
                            ...state,
                            diagnosis_List:[],
                            truckid_Diagnosis:action.value,
                            pictures_Diagnosis:[],
                        
                        
                        }   
                        

    }
    return state;
};

export default reducer;