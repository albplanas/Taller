import {Toast} from "./messenger"
import {Build_Text} from "./dataBuilder"
import {Create_NewOrder,Create_NewOrder_Number}                 from '../SQL/SendSOData/Create_SO' 
import {Create_New_Labor_SO}                                    from '../SQL/SendSOData/Labor_Service_Order' 
import {    Read_Diag_SO,Get_LastRecord_by_Maintenance,
            Create_New_Diag_SO,Get_LastRecord_by_Maint_Diag}    from '../SQL/SendSOData/Diagnosis_Service_Order' 

import {Create_New_Picture_SO}                                  from '../SQL/SendSOData/Picture_Service_Order' 


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






export async function SqlManipulation(diag,info,clock,pic,pieces) {


  
         // Toast("Creating a New Service Order ...");
   //Subscribe The General diagnosis
        let diagnosisGeneralRegister= await Create_New_Service_Order(diag,info)
        
        const IdMaintenance=diagnosisGeneralRegister[0].IdMaintenance
       // console.log("IdMaintenance",IdMaintenance)
   //Subscribe The PARTICULAR diagnosis
        let diagnosisRegister= await Create_Diagnosis_SO_Register(diag,IdMaintenance)//created.IdMaintenance)       
 
    //Subscribe Labor
     let LaborRegister=Create_Labor_SO_Register(diag,IdMaintenance)

     //SubscribeLabor
      let PictureRegister= await Create_Picture_SO_Register(pic,IdMaintenance)
  
      

                    return PictureRegister
      }
    

//Create new Service Order
async function Create_New_Service_Order(diag,info) {
                var d=new Date;
                let number = await  Create_NewOrder_Number();                                       //Get Number of the new Services Order
                //Subscribe The GENERAL diagnosis   
                
                                const newGeneralItem={                                                                      //Configure the new Item  
                                                        number:number
                                                        ,IDCatEquip:diag[0].IDCatEquip
                                                        ,date:d.toISOString().slice(0,10)
                                                        ,mtto_mill:(info.Mileage+"").length>1?info.Mileage:".00"
                                                        ,explanation:Build_Text(diag,"explanation")
                                                        ,status:0
                                                        ,diagnosis : Build_Text(diag,"description")
                                                        ,scheduledmaint:info.IsMaintenance===true?1:0
                                                        ,isOdometerBroken:info.IsOdometerBroken===true?1:0
                                                }
            
                            return await Create_NewOrder(newGeneralItem);                                        //Create the new Item in SQL
            
         }

//Create new Service Order
async function Create_Diagnosis_SO_Register(diag,IdMaintenance) {
    var d = new Date;
    const arr=[... new Set(diag.map(elem=>elem.feature))]
    
    const newParticularItem=arr.map(elem=>{
                                                return {                                                                      //Configure the new Item  
                                                    IdMaintenance:  IdMaintenance
                                                    ,IDSysScheme:   elem
                                                    ,dateOpen:      d.toISOString().slice(0,10)
                                                    ,dateClose:     ""
                                                    ,status:        0
                                            }
                                        })
    

   return newParticularItem.length>0?await Create_New_Diag_SO(newParticularItem)  :null                      

}

//Create new Mechanical Labor Item
async function Create_Labor_SO_Register(diag,IdMaintenance) {

    let  labor=await Get_LastRecord_by_Maintenance(IdMaintenance) ;

    const laborDiag = diag.map(elem=>{
        var xElem= labor.filter(x=>x.IDSysScheme===elem.feature)
       
        return  xElem.length>0 ?
                xElem[0].IdMaintDiag!==undefined? {
                                                    IdMaintDiag:xElem[0].IdMaintDiag
                                                    ,idMechanics:elem.idmechanic
                                                    ,description:elem.description
                                                    ,explanation:elem.explanation
                                                    ,date:elem.date
                                                    ,status:elem.signed===true?1:0
                                        }:null:null
                                    }).filter(x=>x!==null)


    
//Subcribe Labor on sql
       
   return laborDiag.length>0? await  Create_New_Labor_SO(laborDiag):null;                       

}



async function Create_Picture_SO_Register(pic,IdMaintenance) {

    let  labor=await Get_LastRecord_by_Maintenance(IdMaintenance) ;

    const laborDiag =     pic.map(elem=>{                                      //
                          
                                    var xElem= labor.filter(x=>x.IDSysScheme===elem.feature)
                            
                                    return  xElem.length>0 ?
                                            xElem[0].IdMaintDiag!==undefined?
                                                                                {
                                                                                            IdMaintDiag:xElem[0].IdMaintDiag
                                                                                            ,picture:elem.uri
                                                                                            ,date:elem.date
                                                                                            ,idEmployee:elem.idEmployee
                                                                                        }:null:null
                                    }).filter(x=>x!==null)


                                 
    
//Subcribe Labor on sql                         
      return  laborDiag.length>0? await  Create_New_Picture_SO(laborDiag):null;                      
}

//Create new Mechanical CLOCK Item
async function Create_CLOCK_Labor_Register(diag) {
                      

}