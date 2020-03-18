import React ,{useEffect, useState} from 'react';
import { StyleSheet, Alert} from 'react-native';
import {
  Layout,
  Text,
} from '@ui-kitten/components';

import {ReviewChanges} from "./ReviewChanges"



import {Alert_Decicion,Validation}   from "../../globalFunc_Use/messenger"
import {SqlManipulation}  from "../../globalFunc_Use/sql"
import {storeData}        from "../../globalFunc_Use/globalJSFunctions" 

import {TopNavigationComponent} from "./TopNavigator.component"

import {GlobalUpdate} from "../../globalFunc_Use/cleaning"

import {Toast_SMS} from "../../globalFunc_Use/messenger"
import{RefreshFunct} from "../../globalFunc_Use/globalJSFunctions"//=(onUpdate_LIST,setRefreshing)
import { batch } from 'react-redux';
import { Read_Diag_SO } from "../../SQL/SendSOData/Diagnosis_Service_Order"
import {Loading} from "./TopNavigator.component"







export const EditServiceOrderScreen =(props)=>{

        const [DiagnosisArray, setDiagnosisArray] = React.useState([]);
        const [ExtraArrayOriginal, setExtraArrayOriginal] = React.useState([]);
        //
        const [spin, setSpin] = React.useState(false);
        //
        const [DiagnosisArray_DataBase, setDiagnosisArray_DataBase] = React.useState([]);       

useEffect(() => {
          
          const arr= Array.isArray(props.diagnosis_List)?
                                                          props.diagnosis_List.filter(e=>e.IDCatEquip===props.route.params.item.IDCatEquip)
                                                                              .map(f=>{return{
                                                                                              ...f,
                                                                                              name:props.MechanicList.filter(e=>e.IdEmployee===f.idmechanic)[0].short_name
                                                                                      }}):[]
          setDiagnosisArray(arr)  ;

  }, [props.diagnosis_List]);

const Refresh=()=>{
  setSpin(true);
  Read_Diag_SO(props.route.params.item.IdMaintenance
                  ,(x)=>{
                    setSpin(false);

                    

                    setDiagnosisArray_DataBase( x.map(elem=>{

                      const list=props.FeaturesList.filter(f=>f.SubId===elem.IDSysScheme);
                  
                                                              return {
                                                                          Description: list[0].Description,
                                                                          
                                                                          IDCatEquip: props.route.params.item.IDCatEquip, 
                                                                          IdMaintenance: elem.IdMaintenance, 
                                                                          activity: "disable", 
                                                                          
                                                                          categoryId: list[0].Id, 
                                                                          
                                                                          check: true, 
                                                                          date: elem.date.date.slice(0,10), 
                                                                          description: elem.description,
                                                                          equipmentCod: props.route.params.item.cod, 
                                                                          explanation: elem.explanation, 
                                                                          
                                                                          feature: elem.IDSysScheme, 
                                                                          idDiagnosis:elem.IdMaintDiag,
                                                                          idSelect: elem.IdDiagLabor,
                                                                          idmechanic:elem.idMechanics, 
                                                                          name:props.MechanicList.filter(e=>e.IdEmployee===elem.idMechanics)[0].short_name,
                                                                          signed: elem.signed===1?true:false,
                                                                          orderclosed:elem.status===1?true:false
                                                                        }
                    }));
                }
  );
}
useEffect(Refresh,[])


useEffect(()=>{
        const newItem={...props.route.params.item}
        const newInfoArr= props.ExtraInfo_Diagnosis.filter(elem=>elem.IdMaintenance===newItem.IdMaintenance);
        newInfoArr.length>0 ? setExtraArrayOriginal(newInfoArr[0]):ChangeExtra({
                                                                                    IdMaintenance:      newItem.IdMaintenance,
                                                                                    IsMaintenance:      newItem.scheduledmaint+''==='0'?false:true,
                                                                                    IsOdometerBroken :  newItem.ErrorInOdometer+''==='0'?false:true,
                                                                                    Mileage:            newItem.mtto_mill
                                                                                  })

},[props.ExtraInfo_Diagnosis])



const ChangeExtra=(elem)=>{

  const newItem={...props.route.params.item}
  const newInfoArr= props.ExtraInfo_Diagnosis.filter(elem=>elem.IdMaintenance!==newItem.IdMaintenance);
  var newArr=elem!==null?newInfoArr.concat(elem):null;

  if(newArr!==null){

    props.onUpdate_DIAGNOSIS("ExtraInfo_Diagnosis",newArr);
    storeData("SO_ExtraInfo_Diagnosis",JSON.stringify(newArr));
    
  }

}

const Send_Data=()=>{



  const IdMaintenanceArr=props.diagnosis_List.filter(x=>x.equipmentCod===props.route.params.item.cod);
  const IdMaintenance=IdMaintenanceArr.length>0?IdMaintenanceArr[0].IdMaintenance:null;

 const Validation_Arr=[
                                  {
                                      validation: IdMaintenanceArr.length>0,
                                      sms       : "Your Diagnoses List must have at lease 1 diagnosis",
                                      action    : ()=>null
                                  },{
                                      validation: ExtraArrayOriginal.IsOdometerBroken===true || (ExtraArrayOriginal.Mileage+"").length>1,
                                      sms       : "If you don't have register for mileage, you must ckeck the Odometer's box with a mark. ",
                                      action    : ()=>null
                                  }
                                ]


 Validation(Validation_Arr,()=>Alert_Decicion(     "Send Data",
                                                    "Do you want to create a new Service Order?",
                                                    ()=>null,
                                                    async ()=>{
                                                                    Toast_SMS("Saving Changes ...")

                                                                    let data=    await SqlManipulation( DiagnosisArray.filter(y=>y.IdMaintenance===IdMaintenance),
                                                                                                ExtraArrayOriginal,
                                                                                                [],
                                                                                                props.imgList.filter(y=>y.IdMaintenance===IdMaintenance),
                                                                                                [])
                                                                          
                                                                    Toast_SMS("Loading Changes ...")

                                                                        batch(() => {
                                                                                          GlobalUpdate(props.imgList.filter(y=>y.IdMaintenance!==IdMaintenance),
                                                                                                        "pictures_Diagnosis",
                                                                                                        props.onUpdate_DIAGNOSIS)
                                                                                          GlobalUpdate(props.ExtraInfo_Diagnosis.filter(y=>y.IdMaintenance!==IdMaintenance && y.IdMaintenance!==undefined),
                                                                                                          "ExtraInfo_Diagnosis",
                                                                                                          props.onUpdate_DIAGNOSIS)
                                                                                          GlobalUpdate(props.diagnosis_List.filter(y=>y.IdMaintenance!==IdMaintenance),
                                                                                                        "diagnosis_List",props.onUpdate_DIAGNOSIS)
                                                                                        //  props.route.params!==undefined?props.route.params.callback():null
                                                                                      
                                                                                  
                                                                        })

                                                                      Toast_SMS("Refreshing ...")
                                                                        RefreshFunct(props.onUpdate_LIST ,(x)=>x?null:props.navigation.goBack()),1000
                                                                      
                                                                      
                                                                      
                                                                                      }
                                                                ))
 
}




 


 return props.route.params.item!==null?(
                <Layout style={styles.container}>
                                    <TopNavigationComponent navigation={props.navigation} 
                                                            route={props.route} 
                                                            Send_Data={Send_Data}
                                                            spin={spin}
                                                            
                                                            />
                                                  
                                    <ReviewChanges  
                                                      {...props}
                                                      profile={props.FeaturesTruck.filter(e=>e.cod===props.route.params.item.cod)}
                                                      idmechanic={props.MechanicList.filter(e=>e.short_name===props.userName)}
                                                      ExtraArrayOriginal={ExtraArrayOriginal}
                                                      setExtraArrayOriginal={setExtraArrayOriginal}
                                                      setDiagnosisArray={setDiagnosisArray}
                                                      Refresh={Refresh}
                                                      spin={spin}
                                                      DiagnosisArray={DiagnosisArray.concat(DiagnosisArray_DataBase)}
                                                      DiagnosisArray_DataBase={DiagnosisArray_DataBase}
                                                      ChangeExtra={ChangeExtra}
                                                />
                </Layout>
                        ):
                <Layout style={{justifyContent:"center"}}>
                                <Text category="h2" status="danger">NO DIAGNOSIS FOUND 😟😟😟</Text>

          </Layout>;
}



  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    minHeight: 600,
  },
});













