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

import {MechanicList} from "./Mechanics/mecanicList.component"
import {ReviewChanges} from "./Review/ReviewChanges"
import {DiagnosisChart} from "./Diagnosis/DiagnosisTab"

import {Get_Opened_Services_Order_Features} from "../../SQL/maintenance.sql"
import {difference_A_B,intersection} from "./Review/helperFunc"
import {storageDiagnosis,PrepareData} from "./Mechanics/auxiliarFunc"

import {Extra_Info} from "./Extra_Info/Extra_Info"
import {varModel} from "./constructionModel"








export const EditServiceOrderScreen =(props)=>{



/******************* STATE TO SUBMIT *******************/
  


const [bottomTabsIndex, setBottomTabsIndex] = React.useState(0);
const [DiagnosisArrayOriginal, setDiagnosisArrayOriginal] = React.useState([]);
const [MechanicArrayOriginal, setMechanicArrayOriginal] = React.useState([]);
const [PictureArrayOriginal, setPictureArrayOriginal] = React.useState([]);
const [ExtraArrayOriginal, setExtraArrayOriginal] = React.useState();


useEffect(() => {

          //Diagnosis
   
          var id=props.route.params.item.IdMaintenance;
          var DiagnosisArray=props.SO_Diagnosis_OffLine.filter(x=>x.IdMaintenance===props.route.params.item.IdMaintenance)
          var extrainfo = props.SO_ExtraInfo_OffLine.filter(c=>c.id===id).length>0?
                          props.SO_ExtraInfo_OffLine.filter(c=>c.id===id)[0]:varModel(props.route.params.item);

                         
        
          setExtraArrayOriginal(extrainfo)

          Get_Opened_Services_Order_Features( "diagnosis",
                                                id,
                                                (x)=>{
                                                          var arrs=x.map(x=>x.IDSysSchemeDetail)
                                                          DiagnosisArray.length===0?
                                                                                                            storageDiagnosis( arrs,
                                                                                                                              id,
                                                                                                                              [],
                                                                                                                              arrs,
                                                                                                                              props.onUpdate_EDIT_SO
                                                                                                            ):
                                                                                                            
                                                                                                            storageDiagnosis(             intersection(DiagnosisArray[0].snap,arrs).concat(difference_A_B(DiagnosisArray[0].snap,arrs)).concat(difference_A_B(arrs,DiagnosisArray[0].snap)),
                                                                                                                                          id,
                                                                                                                                          DiagnosisArray,
                                                                                                                                          arrs,
                                                                                                                                          props.onUpdate_EDIT_SO
                                                                                                            )
            setDiagnosisArrayOriginal(arrs)   
          })

          Get_Opened_Services_Order_Features( "labor",
                                                id,
                                                (x)=>{
                                         
                                                  setMechanicArrayOriginal(PrepareData(x))}
                                                )

          Get_Opened_Services_Order_Features( "pictures",
                                                id,
                                                (x)=>{
                                                   
                                                      setPictureArrayOriginal(x)
                                                }
                                                )                                      
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
                          DiagnosisArray={props.SO_Diagnosis_OffLine.filter(x=>x.IdMaintenance===props.route.params.item.IdMaintenance)}
                          DiagnosisArrayOriginal={DiagnosisArrayOriginal}
                          />
  
        </Tab>
        <Tab title='MECHANIC' icon={PersonIcon}>
          
              <MechanicList 
                            {...props}
                            item={props.route.params.item}
                            MechanicArrayOriginal={MechanicArrayOriginal} 
                            DiagnosisArray={props.SO_Diagnosis_OffLine.filter(x=>x.IdMaintenance===props.route.params.item.IdMaintenance)}
                     
                            />
         
        </Tab>
        <Tab title='EXTRA INFO' icon={AttachIcon}>
              <Extra_Info  
                          {...props}
                          PictureArrayOriginal={PictureArrayOriginal}
                          ExtraArrayOriginal={ExtraArrayOriginal}
                          setExtraArrayOriginal={setExtraArrayOriginal}
              />
        </Tab>

                <Tab title='REVIEW CHANGES' icon={DoneAllIcon}>
            <ReviewChanges  
                  {...props}
                  ExtraArrayOriginal={ExtraArrayOriginal}
                  setBottomTabsIndex={setBottomTabsIndex}
                  DiagnosisArray={props.SO_Diagnosis_OffLine.filter(x=>x.IdMaintenance===props.route.params.item.IdMaintenance)}
                  MechanicArray={props.SO_MechanicLabor_OffLine.filter(x=>x.IdMaintenance===props.route.params.item.IdMaintenance)}
                  MechanicArrayOriginal={MechanicArrayOriginal}
                  DiagnosisArrayOriginal={DiagnosisArrayOriginal}
                  setExtraArrayOriginal={setExtraArrayOriginal}
                  
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
      <Text category="h3">EDIT SERVICE ORDER </Text>
      <Text category="c3">EQUIPMENT :   {props.route.params.item.cod} </Text>
    </Layout>
    <Layout style={{ flexDirection: 'row',justifyContent: 'center',}} level="4">
       
        <Button style={{margin:8,minWidth:200}} 
                size='giant' 
                icon ={ Close_Icon}
                status="danger"
                onPress={()=>{props.navigation.goBack()}}
                >Cancel Edit</Button>
        {props.bottomTabsIndex===3?<Button style={{margin:8,minWidth:200}} status="success" size='giant' icon ={Upload_Icon}>UPLOAD </Button>:null}
        {props.bottomTabsIndex<3?<Button style={{margin:8,minWidth:200}} onPress={()=>props.setBottomTabsIndex(4)} status="info" size='giant' icon ={DoneAllIcon}>CHECK OUT </Button>:null}
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








