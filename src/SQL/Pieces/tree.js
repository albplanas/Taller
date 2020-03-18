import axios from 'axios';


export const Read_Tree_Pieces=async (id)=>{
   
    let result = await axios.post('http://jva-sql:8080/Assistance/Diagnostic/php-sql/Pieces/Piece_Tree.php',
                  JSON.stringify({mode:"read",id:id}))
                                          .then((response)=> {
                                              
                                             return Array.isArray(response.data)?response.data:
                                             []
                                      })
                                          .catch(error => {
                                                                 alert("Something was wrong : "+error)
                                                                  return []
                                                              })  
              return  result
             
    }