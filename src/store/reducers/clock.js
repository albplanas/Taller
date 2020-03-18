import * as actionTypes from '../actions'; 
import {storeData} from "../../globalFunc_Use/globalJSFunctions" 


const initialState = {
   
        Clock_List:[],
        current_ClockIn:0
}


const reducer = (state = initialState, action) => {


    switch(action.type){
       
      
       case actionTypes.UPDATE_Clock_LIST:

                  storeData(action.property,JSON.stringify(action.value))
                   console.log("action ",action.property,action.value)
                        return {
                            ...state,
                            [action.property]:action.value
                        
                        
                        }   
 
       case actionTypes.STARTUP_Clock_LIST:
                            return {
                                ...state,
                                [action.property]:action.value
                            
                            
                            }                    

    }
    return state;
};

export default reducer;