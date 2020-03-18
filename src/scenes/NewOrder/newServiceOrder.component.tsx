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



export const NewServiceOrderScreen =(props)=>{

        const [DiagnosisArray, setDiagnosisArray] = React.useState([]);
        const [ExtraArrayOriginal, setExtraArrayOriginal] = React.useState([]);


        useEffect(() => {
          
          
                            
                    //Diagnosis
                //  console.log("Render  NewServiceOrderScreen",props.ExtraInfo_Diagnosis)
                  const arr= Array.isArray(props.diagnosis_List)?props.diagnosis_List.filter(e=>e.IDCatEquip===props.route.params.item.IDCatEquip):[]

                  const IdMaintenance=arr.length>0?arr[0].IdMaintenance:null;

                  var elem= IdMaintenance===null?[]:Array.isArray(props.ExtraInfo_Diagnosis)?
                                          props.ExtraInfo_Diagnosis.filter(e=>e.IdMaintenance===IdMaintenance).length>0?
                                          props.ExtraInfo_Diagnosis.filter(e=>e.IdMaintenance===IdMaintenance)[0]
                                          :"new"
                                          :"new"
          
                const newsExtra={
                                    IdMaintenance:IdMaintenance
                                  , IsMaintenance:false
                                  , IsOdometerBroken:false
                                  , Mileage:""
                }
                elem!==null? elem==="new"?ChangeExtra(newsExtra):setExtraArrayOriginal(elem):null

        }, [JSON.stringify(props.ExtraInfo_Diagnosis)]);

        useEffect(() => {
          
                const arr= Array.isArray(props.diagnosis_List)?props.diagnosis_List.filter(e=>e.IDCatEquip===props.route.params.item.IDCatEquip).map(f=>{return{
                  ...f,
                  name:props.MechanicList.filter(e=>e.IdEmployee===f.idmechanic)[0].short_name
                }}):[]
                setDiagnosisArray(arr)  ;

        }, [props.diagnosis_List]);


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



  const ChangeExtra=(arr)=>{

          var newArr=arr!==null?props.ExtraInfo_Diagnosis.filter(e=>e.IdMaintenance!==arr.IdMaintenance).concat(arr):null;

          if(newArr!==null){

            props.onUpdate_DIAGNOSIS("ExtraInfo_Diagnosis",newArr);
            storeData("ExtraInfo_Diagnosis",JSON.stringify(newArr));
            
          }

  }

 return props.route.params.item!==null?(
                <Layout style={styles.container}>

                  <TopNavigationComponent navigation={props.navigation} 
                                          route={props.route} 
                                          Send_Data={Send_Data}
                                          />
                
                  <ReviewChanges  
                                      {...props}
                                      idmechanic={props.MechanicList.filter(e=>e.short_name===props.userName)}
                                      ExtraArrayOriginal={ExtraArrayOriginal}
                                      setExtraArrayOriginal={setExtraArrayOriginal}
                                      setDiagnosisArray={setDiagnosisArray}
                                      DiagnosisArray={DiagnosisArray}
                                      ChangeExtra={ChangeExtra}
                                />


                </Layout>
          ):<Layout style={{justifyContent:"center"}}>
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













