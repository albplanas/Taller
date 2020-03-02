import React ,{useEffect} from 'react';
import { StyleSheet ,Alert } from 'react-native';
import {
  Layout,
} from '@ui-kitten/components';

//import {varModel} from "../EditServiceOrder/constructionModel"
//import {ReviewChanges} from "./Review/ReviewChanges"
import {TopNavigationDiagnosis} from "./TopNavigator.component"
import {ListOfCommitments} from "./ListOfCommitments.component"
import {ListOfResources} from  "./Resources/ListOfResources.component"

import {storeData} from "../../globalFunc_Use/globalJSFunctions"
import { AppRoute } from '../../navigation/app-routes';






export const DiagnosisFileScreen =(props)=>{

 

/******************* STATE TO SUBMIT *******************/
  

const [itemselect, setItemselect] = React.useState(-1);
const [item, setItem] = React.useState(null);
const [enablelist,setEnablelist]=React.useState([])
const [pictureArray,setpictureArray]=React.useState([])


useEffect(() => {
            //props.diagnosis_List.length===0?props.navigation.goBack():null
          //Diagnosis
          setItemselect(0)
         // console.log("Render  DiagnosisFileScreen",props.route.params,props.diagnosis_List);
         if(props.route.params.item===null || props.route.params.item===undefined)
            {props.navigation.navigate(AppRoute.SERVICE_ORDER)}
          setItem(props.route.params.item);
          setpictureArray(props.imgList)

          setEnablelist(props.diagnosis_List.filter(e=> e.IdMaintenance===props.route.params.item.IdMaintenance && e.feature===props.route.params.item.feature)
                                            .map(e => {
                                           
                                                          return {
                                                             mechanic: e.idmechanic!==null?props.MechanicList.filter(x=>x.IdEmployee===e.idmechanic)[0].short_name:"Employee No Found"
                                                            ,... e
                                                          }
                                            }))
                                            

}, [props.diagnosis_List.length]);

const onSignLabor=()=>{
  Alert.alert(
      'SIGN REPORT ?',
      'My Alert Msg',
      [
      {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
      },
      {text: 'OK', onPress: () =>null},
      ],
      {cancelable: false},
  );
}

  const AddLabor =()=>{
    var d= new Date;
    var date=d.toISOString().slice(0,10);

    const newElem= {
                      IDCatEquip: props.route.params.IDCatEquip, 
                      IdMaintenance: props.route.params.IdMaintenance, 
                      activity: "enable", 
                      categoryId: props.route.params.categoryId, 
                      date: date, 
                      description: "", 
                      equipmentCod: props.route.params.equipmentCod, 
                      explanation: "", 
                      feature: props.route.params.feature, 
                      idSelect: parseFloat(Math.random()*1000000+"").toFixed(0), 
                      idmechanic: props.route.params.idmechanic,
                      signed: false
                    }

  const newarr=[newElem].concat(props.diagnosis_List);

  props.onUpdate_DIAGNOSIS(newarr);
  storeData("diagnosis_List",JSON.stringify(newarr));
  setItemselect(0)
  }

 return (
    <Layout style={styles.container} level="4">

            <TopNavigationDiagnosis navigation={props.navigation} 
                                    title={item===null?"":item.SubTitle} 
                                    subtitle={item===null?"":"Equipment : "+item.equipmentCod}
                                    />
              
              <Layout style={[styles.containerLayout,{marginTop:15}]}level="4">

                    <Layout style={[styles.layout,{maxWidth:500}]} level='2'>
                          <ListOfCommitments  enablelist={enablelist}  
                                              itemselect={itemselect} 
                                              setItemselect={setItemselect}
                                              AddLabor={AddLabor}/>
                    </Layout>

                    <Layout style={[styles.layout,{marginLeft:10}]} level='2'>
                          <ListOfResources  navigation={props.navigation}
                                            diagnosis_List={props.diagnosis_List} 
                                            enablelist={enablelist} 
                                            itemselect={itemselect}
                                            FeaturesList={props.FeaturesList} 
                                            onUpdate_DIAGNOSIS={props.onUpdate_DIAGNOSIS}
                                            UPDATE_Clock_LIST={props.UPDATE_Clock_LIST}
                                            Clock_List={props.Clock_List}
                                            pictureArray={pictureArray}/>
                    </Layout>

              </Layout>

    </Layout>
  );
}


//DiagnosisFileScreen .whyDidYouRender = true;



  
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    minHeight: 600,
  },
  containerLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});








