import * as actionTypes from '../actions'; 
const initialState = {
   
        diagnosis_List:[],
        truckid_Diagnosis:null,
        notes:"",
        pictures_Diagnosis:[],
        ExtraInfo_Diagnosis:[]
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