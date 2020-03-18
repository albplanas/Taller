import * as actionTypes from '../actions'; 

const initialState = {
   
    diagnosis_List:[],
    truckid_Diagnosis:null,
    pictures_Diagnosis:[],
    ExtraInfo_Diagnosis:[]
       
}
const reducer = (state = initialState, action) => {


    switch(action.type){
       
      
       case actionTypes.UPDATE_SERVICE_ORDER:


                    
                        return {
                            ...state,
                            [action.property]:action.value
                        
                        
                        }   
                        

    }
    return state;
};

export default reducer;