import {difference_A_B} from "./helperFunc"
import {DescomposeNotes,deleteLabor,storageDiagnosis} from "./auxiliarFunc";



const dataDiagnosisConstruction  =(DiagnosisArray,DiagnosisArrayOriginal,FeaturesList)=>{

  return DiagnosisArray.length>0?
                    DiagnosisArray[0].cancel.map(x=>{
                                        var Elem= FeaturesList.filter(e=>e.SubId===x);
                                        var DataElem=  Elem.length===0?{Description: "Unkonwn",Id: null, "SubId": null, Title: "Unkonwn"}:Elem[0]
                                        return {
                                                    title: DataElem.Description,
                                                    description: DataElem.Title,
                                                    status:'cancel',
                                                    id:Elem[0].SubId,
                                                    snap:DiagnosisArray[0].snap
                                            }})
                    .concat(DiagnosisArray[0].plus.map(x=>{
                                                                var Elem= FeaturesList.filter(e=>e.SubId===x);
                                                                var DataElem=  Elem.length===0?{Description: "Unkonwn",Id: null, "SubId": null, Title: "Unkonwn"}:Elem[0]
                                                                return {
                                                                        title: DataElem.Description,
                                                                        description: DataElem.Title,
                                                                        status:'new',
                                                                        id:Elem[0].SubId,
                                                                        snap:DiagnosisArray[0].snap
                                                                        }}))                                                                         
                    .concat(difference_A_B(DiagnosisArrayOriginal,DiagnosisArray[0].cancel).map(x=>{
                                                                var Elem= FeaturesList.filter(e=>e.SubId===x);
                                                                var DataElem=  Elem.length===0?{Description: "Unkonwn",Id: null, "SubId": null, Title: "Unkonwn"}:Elem[0]
                                                                return {
                                                                        title: DataElem.Description,
                                                                        description: DataElem.Title,
                                                                        status:'old',
                                                                        id:null
                                                            }})):[];
} 

const dataMechanicsConstruction  =(MechanicArray,MechanicArrayOriginal)=>{

    return MechanicArray.map(x=>{

                                    return {
                                                title: x.name,
                                                description:x.date+ " / "+x.hrs + " hrs : "+ DescomposeNotes(x.notes).diagnosis,
                                                status:'new',
                                                id:x.localId
                                        }})
                        .concat(MechanicArrayOriginal.map(x=>{
                                        return {
                                                title: x.name,
                                                description: x.date+ " / "+x.hrs + " hrs : "+ DescomposeNotes(x.notes).diagnosis,
                                                status:'old'
                                                ,id:null
                                }}))
}  

       

const  dataPicturesConstruction =(id,SO_Picture_OffLine,PictureArrayOriginal)=>{

    return SO_Picture_OffLine.filter(e=>e.IdMaintenance===id )
                                    .map(e=>{return{
                                                    PictureID:e.PictureID,
                                                    IdMaintenance:e.IdMaintenance,
                                                    illustration:e.Photo,
                                                    //uri:e.Photo,
                                                    uri:e.uri,
                                                    noEditable:false,
                                                    date:""}})
                                    .concat(PictureArrayOriginal.map(e=>{return{
                                                    PictureID:e.PictureID,
                                                    IdMaintenance:e.IdMaintenance,
                                                    illustration:e.Photo,
                                                    uri:e.Photo,
                                                    noEditable:true,
                                                    date:""}})) 
}   


const varModel=(item)=>{

    return {
     id :item.IdMaintenance,
     arr:[{
            title: 'Is it a MAINTENANCE ?',
            description:"description",
            value:item.scheduledmaint===1?true:false,
            inputType:"checkbox"
          },
          {
            title: 'Is the odomether broken ?',
            description:"description",
            value:item.ErrorInOdometer===1?true:false,
            inputType:"checkbox"
          },{
            title: 'Notes',
            description:"description",
            value:item.explanation,
            inputType:"textArea"
        },
        {
          title: 'Millage',
          description:"Currrent Mileage in the Equipment",
          value:item.mtto_mill,
          inputType:"inputArea"
        },]
          } 
  }


  function GetDataFeatures(pack,itemEquip,enableList,idmechanic,IdMaintenance){
    
            var d= new Date;
            const dateToday=d.toISOString().slice(0,10);
            var reduceList=enableList.filter(e=>e.IDCatEquip===itemEquip.IDCatEquip)
          
          
          return pack.Subarr.map(x=>{
          
          
            const elem=reduceList.filter(s=>s.feature===x.SubId);
          
                              return {
                                IdMaintenance:elem.length>0?elem[0].IdMaintenance:IdMaintenance,/* it must be passed trhough the route and created inside of Modal Component */
                                signed:false,
                                categoryId:pack.Id,
                                idSelect:parseFloat(Math.random()*1000000+"").toFixed(0),
                                IDCatEquip:itemEquip.IDCatEquip,
                                equipmentCod:itemEquip.cod,
                                feature:x.SubId,
                                Description:x.Description,
                                check:elem.length>0?true:false,
                                activity: elem.length>0?"disable":"enable",
                                description:elem.length>0?elem[0].description:"",
                                explanation:elem.length>0?elem[0].explanation:"",
                                date:elem.length>0?elem[0].date:dateToday,
                                idmechanic:elem.length>0?elem[0].idmechanic:idmechanic[0].IdEmployee
                              }
          })
  }



export {
    dataDiagnosisConstruction ,
    dataMechanicsConstruction,
    dataPicturesConstruction,
    varModel,

    GetDataFeatures
}                                