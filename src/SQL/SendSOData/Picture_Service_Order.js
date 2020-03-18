
import axios from 'axios';

/*
      [IdMaintenance]  
      ,[number]

      ##################### Object from App #############

                            ,[IDCatEquip]
                            ,[date]                 
                            ,[mtto_mill]
                            ,[explanation]
                            ,[status]=0
                            ,[diagnosis]
                            ,[scheduledmaint]
*/


export const Create_New_Picture_SO=async (arr)=>{
   
                                             let result = await axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/Subscriptions/SO_Pictures.php',JSON.stringify({mode:"New_Picture",picture:arr}))
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
              

