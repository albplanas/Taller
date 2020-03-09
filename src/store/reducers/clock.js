import * as actionTypes from '../actions'; 


const initialState = {
   
        Clock_List:[],
        current_ClockIn:0
}


const reducer = (state = initialState, action) => {


    switch(action.type){
       
      
       case actionTypes.UPDATE_Clock_LIST:


                    
                        return {
                            ...state,
                            [action.property]:action.value
                        
                        
                        }   
 
                        

    }
    return state;
};

export default reducer;