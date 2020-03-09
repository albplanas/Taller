

export const CloseClock=(elem)=>{
                                const millNow = Date.now()
                                var newElem={...elem};
                                newElem.clockRecords[newElem.clockRecords.length-1].clock_out  =   newElem.clockRecords[newElem.clockRecords.length-1].clock_out===null? millNow:
                                                                                                    newElem.clockRecords[newElem.clockRecords.length-1].clock_out  ;
                                return  newElem  
                            }


 export const CloseClockInClock=(Clock_List,upload)=>{
    const millNow = Date.now();
    var newClock=Clock_List.map((elem,index)=>{
                                 
                                    return {       ...elem,
                                                clockRecords:elem.clockRecords.map(ex=>{
                                                                                            return {...ex,
                                                                                                        clock_out:ex.clock_out===null?millNow:ex.clock_out}
                                                                                        })
                                    }
                                })              
                                upload(newClock)                             
                                                        }
                                                        
                                                        
export const OpenClockInClock=(Clock_List,item,upload)=>{
  
    const millNow = Date.now();
    var ind=0;
    var newClock=Clock_List.map((elem,index)=>{
        ind=(elem.idDiagnosis===item.idDiagnosis && elem.idmechanic===item.idmechanic && elem.date===item.date)?index:ind
        return (elem.idDiagnosis===item.idDiagnosis && elem.idmechanic===item.idmechanic && elem.date===item.date)?
               {       ...elem,
                            clockRecords:elem.clockRecords.map(ex=>{
                                                                        return {...ex,
                                                                                    clock_out:ex.clock_out===null?millNow:ex.clock_out}
                                                                    }).concat({
                                                                        clock_in: millNow,
                                                                        clock_out:null
                                                                    })
                }:{       ...elem,
                    clockRecords:elem.clockRecords.map(ex=>{
                                                                return {...ex,
                                                                            clock_out:ex.clock_out===null?millNow:ex.clock_out}
                                                            })
        }
    })     
   
    upload(newClock,ind)                       
                            }                            
                         
export   const AddClock=(elem)=>{
    const millNow = Date.now()
    var newElem={...elem};
    newElem.clockRecords=newElem.clockRecords.concat({
                                                          clock_in :millNow,
                                                          clock_out:null,
                                                      })
    return newElem
  }

export   const CloseAllClock=(arr)=>{
    
            return arr.map(e=>CloseClock(e))
        }

        
export   const AddGlobalClock=(arr,options)=>{
            const millNow = Date.now()
            var newArr=[...arr];
             return newArr.concat([{
                                                    ...options,
                                                    clockRecords:[{
                                                                    clock_in :millNow,
                                                                    clock_out:null,
                                                                }]
                                            }])
        }        
