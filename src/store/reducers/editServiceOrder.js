import * as actionTypes from '../actions'; 

const initialState = {
   
    DiagnosisEdition:[],
    SO_Diagnosis_OffLine:[],
    SO_MechanicLabor_OffLine:[],
    SO_Picture_OffLine:[],
    SO_ExtraInfo_OffLine:[]
}
const reducer = (state = initialState, action) => {


    switch(action.type){
       
      
       case actionTypes.UPDATE_EDIT_SO:


                    
                        return {
                            ...state,
                            [action.property]:action.value
                        
                        
                        }   
                        

    }
    return state;
};

export default reducer;