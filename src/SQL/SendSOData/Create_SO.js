
import axios from 'axios';

import {newNumber} from "../../globalFunc_Use/sql.js"


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

getUsers = async () => {
    let res = await axios.get("https://reqres.in/api/users?page=1");
    let { data } = res.data;
    this.setState({ users: data });
};

export const Create_NewOrder_Number=async ()=>{
   
    let result = await axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/SO_Details.php',JSON.stringify({mode:"soNumber"}))
                            .then((response)=> {
                                    
                                // response.data.length>0?callback(response.data[0].Photo,response.data[0].PictureID):callback("","")
                                const nNumber= Array.isArray(response.data)===true?response.data.length>0?typeof(response.data[0].LNumber)==="string"?newNumber(response.data[0].LNumber):null:null:null

                                if(nNumber!==null){
                                    return nNumber
                                }
                                else{
                                    alert("Something was wrong: " +"Invalid Number ");
                                    return null
                                }
                        })
                            .catch(error => {
                                                alert("something was wrong" +error);
                                                return null
                                                })  
   return  result
}


export const Create_NewOrder= async (newItem)=>{
   
    let result = await axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/SO_Create_New.php',JSON.stringify({mode:"new_SO",item:newItem}))
                        .then((response)=> {

                            return Get_LastRecord(newItem.number)
                            
                        })
                        .catch(error => {
                                alert("something was wrong" +error);
                                return null
                        })  
    return  result
}

export const Get_LastRecord=async (number)=>{
   
    let result = await axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/SO_Details.php',JSON.stringify({mode:"get_Record_by_SO_Number",number:number}))
                            .then((response)=> {
                                
                                return Array.isArray(response.data)?response.data:null
                                
                            })
                           .catch(error => {
                                alert("something was wrong" +error);
                                return null
                                })  
   return  result                            
}


