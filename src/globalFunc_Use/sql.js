import {Toast} from "./messenger"
import {Build_Text} from "./dataBuilder"
import {Create_NewOrder,Create_NewOrder_Number,Get_LastRecord} from "../../SQL/SendSOData/Create_SO"

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


export async function SqlManipulation(diag,info) {

    var d=new Date;
  
          Toast("Creating a New Service Order ...")
                    let number = await  Create_NewOrder_Number();                                       //Get Number of the new Services Order
  
                    const newItem={                                                                      //Configure the new Item  
                                      number:number
                                      ,IDCatEquip:diag[0].IDCatEquip
                                      ,date:d.toISOString().slice(0,10)
                                      ,mtto_mill:info.Mileage
                                      ,explanation:Build_Text(diag,"explanation")
                                      ,status:0
                                      ,diagnosis : Build_Text(diag,"description")
                                      ,scheduledmaint:info.IsMaintenance===true?1:0
                                      ,isOdometerBroken:info.IsOdometerBroken===true?1:0
                                      }
  
                   let create = await Create_NewOrder(newItem);                                         //Create the new Item in SQL 
  
                   //Subscribe LABOR 
                   console.log(create)
  
                    return 1;
      }