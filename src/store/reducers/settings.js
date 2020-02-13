import * as actionTypes from '../actions'; 

const initialState = {
   
        theme:"dark",
        userName:null,
        language:"ENGLISH"
}
const reducer = (state = initialState, action) => {


    switch(action.type){
       
      
       case actionTypes.UPDATE_SETTINGS:


                    
                        return {
                            ...state,
                            [action.property]:action.value
                        
                        
                        }   
                        

    }
    return state;
};

export default reducer;