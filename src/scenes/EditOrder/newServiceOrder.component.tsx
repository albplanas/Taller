import React ,{useEffect} from 'react';
import { StyleSheet  } from 'react-native';
import {
  Layout,
  Text,
  Button
} from '@ui-kitten/components';

import { Upload_Icon,Close_Icon} from '../../assets/icons';

import {ReviewChanges} from "./ReviewChanges"
import {storeData} from "../../globalFunc_Use/globalJSFunctions" 














export const EditServiceOrderScreen =(props)=>{



/******************* STATE TO SUBMIT *******************/
  


const [bottomTabsIndex, setBottomTabsIndex] = React.useState(0);
const [DiagnosisArray, setDiagnosisArray] = React.useState([]);
const [ExtraArrayOriginal, setExtraArrayOriginal] = React.useState([]);


useEffect(() => {
   
  
                    
            //Diagnosis
         // console.log("Render  NewServiceOrderScreen",props.ExtraInfo_Diagnosis)
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
   
        const arr= Array.isArray(props.diagnosis_List)?props.diagnosis_List.filter(e=>e.IDCatEquip===props.route.params.item.IDCatEquip):[]
        setDiagnosisArray(arr)  ;

}, [props.diagnosis_List]);




  const ChangeExtra=(arr)=>{

          var newArr=arr!==null?props.ExtraInfo_Diagnosis.filter(e=>e.IdMaintenance!==arr.IdMaintenance).concat(arr):null;

          if(newArr!==null){

            props.onUpdate_DIAGNOSIS("ExtraInfo_Diagnosis",newArr);
            storeData("ExtraInfo_Diagnosis",JSON.stringify(newArr));
            
          }

  }

 return props.route.params.item!==null?(
                <Layout style={styles.container}>

                  <TopNavigationComponent bottomTabsIndex={bottomTabsIndex} setBottomTabsIndex={setBottomTabsIndex} {...props}/>
                
                  <ReviewChanges  
                                      {...props}
                                      idmechanic={props.MechanicList.filter(e=>e.short_name===props.userName)}
                                      setBottomTabsIndex={setBottomTabsIndex}
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






const TopNavigationComponent = (props) => (
  <Layout level="4" style={{minHeight:122,justifyContent: 'center',padding:10}}>
    <Layout style={{ justifyContent: 'center',alignItems: 'center',marginBottom:5}} 
            level="4"
            >
      <Text category="h6">NEW SERVICE ORDER </Text>
      <Text category="h1">EQUIPMENT :   {props.route.params.item.cod} </Text>
    </Layout>
    <Layout style={{ flexDirection: 'row',justifyContent: 'center',}} level="4">
       
        <Button style={{margin:8,minWidth:200}} 
                size='giant' 
                icon ={ Close_Icon}
                status="danger"
                onPress={()=>{props.navigation.goBack()}}
                >Continue Later</Button>
        <Button style={{margin:8,minWidth:200}} status="success" size='giant' icon ={Upload_Icon}>Open New Order </Button>
    </Layout>
  </Layout>
);
 


  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    minHeight: 600,
  },
});








