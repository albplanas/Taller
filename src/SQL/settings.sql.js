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
    })  
}
export{
    GetMechanics,
    Get_Mechanical_Feature_Tree
}