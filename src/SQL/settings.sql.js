import axios from 'axios'

const GetMechanics=(callback)=>{
   
    axios.post('http://jva-sql:8080/Assistance/Taller-Inventory/php-files/Mechanics.php')
    .then((response)=> {
       
        callback(response.data)
    })
    .catch(error => {
        alert("something was wrong" +error)
    })  
}
const Get_Mechanical_Feature_Tree=(callback)=>{
    axios.get('http://jva-sql:8080/Assistance/Taller-Inventory/php-files/Mechanical_Feature_Tree.php')
    .then((response)=> {
      
        callback(response.data)
    })
    .catch(error => {
        alert("something was wrong" +error)
        callback([])
    })  
}

const Get_Diagnosis_Feature_Tree=(callback)=>{

     axios.get('http://jva-sql:8080/Assistance/Taller-Inventory/php-files/Diagnosis_Feature_Tree.php')
     .then((response)=> {
        // console.log(response.data)
         callback(response.data)
     })
     .catch(error => {
         alert("something was wrong" +error)
         callback([])
     })  
 }

export{
    GetMechanics,
    Get_Mechanical_Feature_Tree,
    Get_Diagnosis_Feature_Tree
}