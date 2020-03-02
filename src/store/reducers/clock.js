import * as actionTypes from '../actions'; 


const initialState = {
   
        Clock_List:[{
        
            idmechanic:"",
            name:"Yaidel Garcia",
            date:"02-22-2020",
            idMaintenance:"",
            cod:"321",
            idDiagnosis:"",
            nameDiagnosis:"Electricity / Chamber",
            clockRecords:[{
                clock_in :81812312,
                clock_out:923904212,
            },{
                clock_in :923909888,
                clock_out:null,
            }]
        }],
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