import axios from 'axios';


export const GetSpecificPictures=(id,callback)=>{
   
    axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/registers.php',JSON.stringify({mode:"picturebyId",id:id}))
    .then((response)=> {
            
            response.data.length>0?callback(response.data[0].Photo,response.data[0].PictureID):callback("","")
    })
    .catch(error => {
        alert("something was wrong" +error);
        callback("","")
    })  
}
export const GetAllFeatures=(callback,funct=()=>{console.log("ok")})=>{
   
    axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/registers.php',JSON.stringify({mode:"pictures"}))
    .then((response)=> {
     
        callback(response.data)
        funct();
    })
    .catch(error => {
        alert("something was wrong" +error)
        funct();
    })  
}

