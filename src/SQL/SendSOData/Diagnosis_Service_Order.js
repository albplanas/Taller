
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


export const Create_New_Diag_SO=async (arr)=>{
   
                                             let result = await axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/Subscriptions/SO_Diagnosis.php',JSON.stringify({mode:"New_diagnosis",diagnosis:arr}))
                                                                            .then((response)=> {
                                                                               return response.data
                                                                        })
                                                                            .catch(error => {
                                                                                                alert("something was wrong" +error);
                                                                                                return null
                                                                                                })  
                                                return  result
                                                }

export const Get_LastRecord_by_Maint_Diag=async (IdMaintenance,IDSysScheme)=>{
   
                                                    let result = await axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/Subscriptions/SO_Diagnosis.php',JSON.stringify({mode:"get_Record",IdMaintenance:IdMaintenance,IDSysScheme}))
                                                                            .then((response)=> {
                                                                                
                                                                                return Array.isArray(response.data)?response.data:null
                                                                                
                                                                            })
                                                                           .catch(error => {
                                                                                alert("something was wrong" +error);
                                                                                return null
                                                                                })  
                                                   return  result                            
                                                }

export const Get_LastRecord_by_Maintenance=async (IdMaintenance)=>{
   
                                                    let result = await axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/Subscriptions/SO_Diagnosis.php',JSON.stringify({mode:"get_Record_by_Maintenance",IdMaintenance:IdMaintenance}))
                                                                            .then((response)=> {
                                                                                
                                                                                return Array.isArray(response.data)?response.data:null
                                                                                
                                                                            })
                                                                           .catch(error => {
                                                                                alert("something was wrong" +error);
                                                                                return null
                                                                                })  
                                                   return  result                            
                                                }
                                                


export const Read_Diag_SO=async (id,callback=(x)=>null)=>{
   
                                      let result = await axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/Subscriptions/SO_Diagnosis.php',
                                                    JSON.stringify({mode:"read",id:id}))
                                                                            .then((response)=> {
                                                                               return Array.isArray(response.data)?callback(response.data):
                                                                               callback([])
                                                                        })
                                                                            .catch(error => {
                                                                                                    callback([])
                                                                                                    return null
                                                                                                })  
                                                return  result
                                               
                                      }
export const Sign_Diag_SO=async (id,sign,callback=(x)=>null)=>{
   
                                        let result = await axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/Subscriptions/SO_Diagnosis.php',
                                                      JSON.stringify({mode:"sign",id:id,sign:sign}))
                                                                              .then((response)=> {
                                                                                 return Array.isArray(response.data)?callback(response.data):
                                                                                 callback([])
                                                                          })
                                                                              .catch(error => {
                                                                                                      callback([])
                                                                                                      return null
                                                                                                  })  
                                                  return  result
                                                 
                                        }




