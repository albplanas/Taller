export function newNumber (LNumber){
    
    
    if(LNumber!==null){
        const num=((parseInt(LNumber)-0+1)+"").padStart(7, '0')
        const d=new Date;
        const date=d.toISOString().slice(0,10).split("-")
        
        
        //SN/0305-0006522
        return "SN/"+date[1]+date[2]+"-"+num
          
          
    }
    else{
        alert("Something was Wrong, Try again")
        return null
    }
}