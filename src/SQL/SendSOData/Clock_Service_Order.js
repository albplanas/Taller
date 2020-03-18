
import axios from 'axios';



export const Clock_In_New_Labor_SO=async (arr)=>{
   
                                             let result = await axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/Subscriptions/SO_Clock.php',JSON.stringify({mode:"clock_in",clock:arr}))
                                                                            .then((response)=> {
                                                                              
                                                                               return response.data
                                                                        })
                                                                            .catch(error => {
                                                                                                alert("something was wrong" +error);
                                                                                                return null
                                                                                                })  
                                                return  result
                                                }



 export const Read_Labor_SO=async (id)=>{
   
                                                    let result = await axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/Subscriptions/SO_Labor.php',
                                                                  JSON.stringify({mode:"read",id:id}))
                                                                                          .then((response)=> {
                                                                                           
                                                                                             return response.data
                                                                                      })
                                                                                          .catch(error => {
                                                                                                              alert("something was wrong" +error);
                                                                                                              return null
                                                                                                              })  
                                                              return  result
                                                             
                                                    }
              
export const EditDescription_Labor_SO=async (id,description,explanation,callback)=>{
   
                                                        let result = await axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/Subscriptions/SO_Labor.php',
                                                                      JSON.stringify({mode:"edit",id:id,description:description,explanation:explanation}))
                                                                                              .then((response)=> {
                                                                                                callback();
                                                                                                 return response.data
                                                                                          })
                                                                                              .catch(error => {
                                                                                                                  alert("something was wrong" +error);
                                                                                                                  return null
                                                                                                                  })  
                                                        
                                                                                                                  return  result
                                                                 
                                                        }
