import * as actionTypes from '../actions'; 

const initialState = {
   
        MechanicList:[],
        FeaturesList:[],
        FeaturesTruck:[]
}
const reducer = (state = initialState, action) => {


    switch(action.type){
       
      
       case actionTypes.UPDATE_LIST:


                    
                        return {
                            ...state,
                            [action.property]:action.value
                        
                        
                        }   
                        

    }
    return state;
};

export default reducer;