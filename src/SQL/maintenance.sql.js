import axios from 'axios';


export const GetMaintenceByID=(IDCatEquip,dateStart,dateEnd,callback)=>{
   
    axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/SO_Fetch.php',JSON.stringify({IDCatEquip:IDCatEquip,
                                                                                                dateStart:dateStart,
                                                                                                dateEnd:dateEnd}))
    .then((response)=> {
            
        Array.isArray(response.data)?callback(response.data):callback([])
    })
    .catch(error => {
        alert("something was wrong" +error);
        callback([])
    })  
}
export const GetPiecesByMaintence=(IdMaintenance,callback)=>{
   
    axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/SO_Pieces_by_SO.php',JSON.stringify({mode:"pieces_by_so",
                                                                                                        IdMaintenance:IdMaintenance}))
    .then((response)=> {
        
        Array.isArray(response.data)?callback(response.data):callback([])
    })
    .catch(error => {
        alert("something was wrong" +error);
        callback([])
    })  
}

export const GetPiecesByTruck=(IDCatEquip,callback)=>{
   
    axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/SO_Pieces_by_SO.php',JSON.stringify({ mode:"pieces_by_truck",
                                                                                                        IDCatEquip:IDCatEquip}))
    .then((response)=> {
            
        Array.isArray(response.data)?callback(response.data):callback([])
    })
    .catch(error => {
        alert("something was wrong" +error);
        callback([])
    })  
}

export const Get_Opened_Services_Order=(callback)=>{
   
    axios.get('http://jva-sql:8080/Assistance/Diagnostic/php-sql/SO_JUST_OPEN.php')
    .then((response)=> {
            Array.isArray(response.data)?callback(response.data):callback([])
    })
    .catch(error => {
        alert("something was wrong" +error);
        callback([])
    })  
}

export const Get_Opened_Services_Order_Features=(mode,IdMaintenance,callback)=>{
   
    axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/SO_Labor&Pieces.php',{mode:mode,IdMaintenance:IdMaintenance})
    .then((response)=> {
            
        Array.isArray(response.data)?callback(response.data):callback([])
    })
    .catch(error => {
        alert("something was wrong" +error);
        callback([])
    })  
}

