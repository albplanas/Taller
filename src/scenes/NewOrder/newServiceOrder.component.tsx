import React ,{useEffect} from 'react';
import { StyleSheet  } from 'react-native';
import {
  Layout,
  Text,
  Button
} from '@ui-kitten/components';

import { Upload_Icon,Close_Icon,DoneAllIcon,} from '../../assets/icons';

import {varModel} from "../EditServiceOrder/constructionModel"
import {ReviewChanges} from "./Review/ReviewChanges"













export const NewServiceOrderScreen =(props)=>{



/******************* STATE TO SUBMIT *******************/
  


const [bottomTabsIndex, setBottomTabsIndex] = React.useState(0);
const [DiagnosisArray, setDiagnosisArray] = React.useState([]);
const [ExtraArrayOriginal, setExtraArrayOriginal] = React.useState([]);


useEffect(() => {
         
          //Diagnosis
          console.log("Render  NewServiceOrderScreen")


          setDiagnosisArray(Array.isArray(props.diagnosis_List)?props.diagnosis_List:[])  ;
}, [props.diagnosis_List]);



 return (
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
  );
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
                >Cancel This Order</Button>
        <Button style={{margin:8,minWidth:200}} status="success" size='giant' icon ={Upload_Icon}>UPLOAD </Button>
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








