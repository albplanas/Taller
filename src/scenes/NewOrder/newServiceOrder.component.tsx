import React ,{useEffect} from 'react';
import { StyleSheet} from 'react-native';
import {
  Layout,
  Text,
} from '@ui-kitten/components';

import {ReviewChanges} from "./ReviewChanges"



import {Alert_Decicion}   from "../../globalFunc_Use/messenger"
import {SqlManipulation}  from "../../globalFunc_Use/sql"
import {storeData}        from "../../globalFunc_Use/globalJSFunctions" 

import {TopNavigationComponent} from "./TopNavigator.component"











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

                      Alert_Decicion(     "Send Data",
                                          "Do you want to create a new Service Order?",
                                          ()=>null,
                                          ()=>{  // SqlManipulation(DiagnosisArray,ExtraArrayOriginal)
                                              }
                                        )

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
                                          Send_Data={Send_Data} />
                
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













