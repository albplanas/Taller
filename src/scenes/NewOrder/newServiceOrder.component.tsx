import React ,{useEffect} from 'react';
import { StyleSheet,Alert } from 'react-native';
import {
  Layout,
  Text,
} from '@ui-kitten/components';

import {ReviewChanges} from "./ReviewChanges"
import {storeData} from "../../globalFunc_Use/globalJSFunctions" 
import {Create_NewOrder,Create_NewOrder_Number,Get_LastRecord} from "../../SQL/SendSOData/Create_SO"

import {Toast} from "../../globalFunc_Use/messenger"
import {Build_Text} from "../../globalFunc_Use/dataBuilder"
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




  Alert.alert(
                "Send Data",
                "Do you want to create a new Service Order?",
                [
                  {
                    text: 'Cancel',
                    onPress:()=>null,
                    style: 'cancel',
                  },
                  {text: 'OK', onPress:()=>{
                      console.log("SqlManipulation")
                    SqlManipulation(DiagnosisArray,ExtraArrayOriginal);
                  } },
                ],
                {cancelable: false},
              );

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



async function SqlManipulation(diag,info) {

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

                 console.log(create)

                  return 1;
    }









