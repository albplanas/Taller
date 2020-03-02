import React ,{useEffect} from 'react';
import { StyleSheet  } from 'react-native';
import {
  Layout,
  Text,
  Button
} from '@ui-kitten/components';

import { Upload_Icon,Close_Icon} from '../../assets/icons';

import {ReviewChanges} from "./ReviewChanges"
import {AppRoute} from "../../navigation/app-routes"













export const NewServiceOrderScreen =(props)=>{



/******************* STATE TO SUBMIT *******************/
  


const [bottomTabsIndex, setBottomTabsIndex] = React.useState(0);
const [DiagnosisArray, setDiagnosisArray] = React.useState([]);
const [ExtraArrayOriginal, setExtraArrayOriginal] = React.useState([]);


useEffect(() => {
         
          //Diagnosis
       //  console.log("Render  NewServiceOrderScreen",props.diagnosis_List)

if(props.route.params.item===null || props.route.params.item===undefined){
  props.navigation.navigate(AppRoute.TODO);}
else{     var elem= Array.isArray(props.ExtraInfo_Diagnosis)?
          props.ExtraInfo_Diagnosis.filter(e=>e[0]===props.route.params.item.IDCatEquip).length>0?
          props.ExtraInfo_Diagnosis.filter(e=>e[0]===props.route.params.item.IDCatEquip)[0]
          :[props.route.params.item.IDCatEquip,false,false,""]
          :[props.route.params.item.IDCatEquip,false,false,""]

setDiagnosisArray(Array.isArray(props.diagnosis_List)?props.diagnosis_List.filter(e=>e.IDCatEquip===props.route.params.item.IDCatEquip):[])  ;
setExtraArrayOriginal(elem)}

}, [props.diagnosis_List,props.ExtraInfo_Diagnosis]);



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








