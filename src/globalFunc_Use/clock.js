export const CloseClock=(elem)=>{
                                const millNow = Date.now()
                                var newElem={...elem};
                                newElem.clockRecords[newElem.clockRecords.length-1].clock_out  =   newElem.clockRecords[newElem.clockRecords.length-1].clock_out===null? millNow:
                                                                                                    newElem.clockRecords[newElem.clockRecords.length-1].clock_out  ;
                                return  newElem  
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
