import {difference_A_B} from "../EditServiceOrder/Review/helperFunc"
import {DescomposeNotes,deleteLabor,storageDiagnosis} from "../EditServiceOrder/Mechanics/auxiliarFunc";



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

export {
    dataDiagnosisConstruction ,
    dataMechanicsConstruction,
    dataPicturesConstruction,
    varModel
}                                