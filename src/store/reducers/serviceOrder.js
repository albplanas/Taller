import * as actionTypes from '../actions'; 

const initialState = {
   
    SO_diagnosis_List:[],
       
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