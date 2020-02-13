
import React, { useEffect} from 'react';

import {Get_Opened_Services_Order_Features} from "../../../SQL/maintenance.sql"
import {MechaniLaborList} from "./MechanicListComponent"


export const MechanicList= (props)=> {
  const [piecesArr, setPiecesArr] = React.useState([]);
      useEffect(() => {
                          Get_Opened_Services_Order_Features(     "pieces",    
                                                                    props.item.IdMaintenance,
                                                                    (x)=>setPiecesArr(x.map(e=>Object.assign({}, {IdMaintenancePieces:e.IdMaintenancePieces,
                                                                                                                  text:e.cod   ,
                                                                                                                  idText:e.idcodpieces ,})
                                                                                        )
                                                                                        .concat({IdMaintenancePieces:"",
                                                                                              text:"No Apply"   ,
                                                                                              idText:"" , })
                                                                                      )
                                                            )}, []);
 


          return <MechaniLaborList {...props} 
                                    piecesArr={piecesArr} 
                                    />
      

};








