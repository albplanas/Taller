import React ,{useEffect} from 'react';
import axios from 'axios';
import { StyleSheet  } from 'react-native';
import {
  Layout,
  Text,
  Tab,
  TabView,
  Button
} from '@ui-kitten/components';

import { Upload_Icon,Close_Icon, AttachIcon,PersonIcon,BookmarkIcon,DoneAllIcon,} from '../../assets/icons';


import {DiagnosisChart} from "./Diagnosis/DiagnosisTab"


import {Extra_Info} from "./Extra_Info/Extra_Info"
import {varModel} from "../EditServiceOrder/constructionModel"
import {ReviewChanges} from "./Review/ReviewChanges"











export const NewServiceOrderScreen =(props)=>{



/******************* STATE TO SUBMIT *******************/
  


const [bottomTabsIndex, setBottomTabsIndex] = React.useState(0);
const [DiagnosisArrayOriginal, setDiagnosisArrayOriginal] = React.useState([]);
const [ExtraArrayOriginal, setExtraArrayOriginal] = React.useState();


useEffect(() => {
          console.log(props.truckid_Diagnosis,props.route.params.item.IDCatEquip)
          //Diagnosis
          setDiagnosisArrayOriginal(props.truckid_Diagnosis===props.route.params.item.IDCatEquip?props.diagnosis_List:[])  ;
          const uplist=props.ExtraInfo_Diagnosis.arr!==undefined && props.truckid_Diagnosis===props.route.params.item.IDCatEquip ?props.ExtraInfo_Diagnosis:varModel({IdMaintenance:null,scheduledmaint:0,ErrorInOdometer:0,explanation:"",mtto_mill:''})
                 setExtraArrayOriginal(uplist)  ;  
                 props.truckid_Diagnosis===props.route.params.item.IDCatEquip?null:props.onUpdate_DIAGNOSIS('truckid_Diagnosis',props.route.params.item.IDCatEquip+"");                   
}, []);



 return (
    <Layout style={styles.container}>
      <TopNavigationComponent bottomTabsIndex={bottomTabsIndex} setBottomTabsIndex={setBottomTabsIndex} {...props}/>
      <TabView
                selectedIndex={bottomTabsIndex}
                onSelect={setBottomTabsIndex}
                shouldLoadComponent={(index) => index === bottomTabsIndex}
        >

        <Tab title='DIAGNOSIS' icon={BookmarkIcon}>
         
         <DiagnosisChart 
                          {...props}
                         DiagnosisArrayOriginal={DiagnosisArrayOriginal}
                         setDiagnosisArrayOriginal={setDiagnosisArrayOriginal}
                          />

                          
  
        </Tab>
        <Tab title='EXTRA INFO' icon={AttachIcon}>
                <Extra_Info  
                                  {...props}
                                  ExtraArrayOriginal={ExtraArrayOriginal}
                                  setExtraArrayOriginal={setExtraArrayOriginal}
                      />
        </Tab>

                <Tab title='REVIEW CHANGES' icon={DoneAllIcon}>
                        <ReviewChanges  
                          {...props}
                          
                          setBottomTabsIndex={setBottomTabsIndex}
                          
                          ExtraArrayOriginal={ExtraArrayOriginal}
                          setExtraArrayOriginal={setExtraArrayOriginal}
                          setDiagnosisArrayOriginal={setDiagnosisArrayOriginal}
                          DiagnosisArrayOriginal={DiagnosisArrayOriginal}
                    />
        </Tab>
      </TabView>

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
        {props.bottomTabsIndex===2?<Button style={{margin:8,minWidth:200}} status="success" size='giant' icon ={Upload_Icon}>UPLOAD </Button>:null}
        {props.bottomTabsIndex<2?<Button style={{margin:8,minWidth:200}} onPress={()=>props.setBottomTabsIndex(3)} status="info" size='giant' icon ={DoneAllIcon}>CHECK OUT </Button>:null}
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








