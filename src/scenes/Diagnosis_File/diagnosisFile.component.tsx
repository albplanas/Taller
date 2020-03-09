import React ,{useEffect} from 'react';
import { StyleSheet ,Alert ,ToastAndroid} from 'react-native';
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



import { batch } from 'react-redux';







export const DiagnosisFileScreen =(props)=>{

 

/******************* STATE TO SUBMIT *******************/
  

const [itemselect, setItemselect] = React.useState(-1);
const [item, setItem] = React.useState(null);
const [enablelist,setEnablelist]=React.useState([])
const [pictureArray,setpictureArray]=React.useState([])


useEffect(() => {
          //Diagnosis
          setItemselect(0)
         if(props.route.params.item===null || props.route.params.item===undefined)
            {props.navigation.navigate(AppRoute.SERVICE_ORDER)}
          setItem(props.route.params.item);
          

          setEnablelist(props.diagnosis_List.filter(e=> e.IdMaintenance===props.route.params.item.IdMaintenance && e.feature===props.route.params.item.feature)
                                            .map(e => {
                                           
                                                          return {
                                                             mechanic: e.idmechanic!==null?props.MechanicList.filter(x=>x.IdEmployee===e.idmechanic)[0].short_name:"Employee No Found"
                                                            ,... e
                                                          }
                                            }))
                                            

}, [props.diagnosis_List.length]);

useEffect(() => {
  setpictureArray(props.imgList)

},[props.imgList.length])


  const AddLabor =()=>{
    var d= new Date;
    var date=d.toISOString().slice(0,10);

    const newElem= {
                      IDCatEquip: props.route.params.item.IDCatEquip, 
                      IdMaintenance: props.route.params.item.IdMaintenance, 
                      activity: "enable", 
                      categoryId: props.route.params.item.categoryId, 
                      date: date, 
                      description: "", 
                      equipmentCod: props.route.params.item.equipmentCod, 
                      explanation: "", 
                      feature: props.route.params.item.feature, 
                      idSelect: parseFloat(Math.random()*1000000+"").toFixed(0), 
                      idmechanic: props.route.params.item.idmechanic,
                      signed: false
                    }

  const newarr=[newElem].concat(props.diagnosis_List);
//console.log(newarr)
  props.onUpdate_DIAGNOSIS("diagnosis_List",newarr);
  storeData("diagnosis_List",JSON.stringify(newarr));
  setItemselect(0)
  }
  const onUpload_Picture=(newElem)=>{
                                        const newArr=props.imgList.concat(newElem)
                                        props.onUpdate_DIAGNOSIS("pictures_Diagnosis",newArr);
                                        storeData("pictures_Diagnosis",JSON.stringify(newArr));
                                      }
  const onDelete_Picture=(newElem)=>{
                                        const newArr=props.imgList.filter(e=>e.PictureID!==newElem.PictureID)
                                        props.onUpdate_DIAGNOSIS("pictures_Diagnosis",newArr);
                                        storeData("pictures_Diagnosis",JSON.stringify(newArr));
                                        ToastAndroid.showWithGravityAndOffset(
                                          "This picture has been eliminated 🗑🗑🗑",
                                          ToastAndroid.LONG,
                                          ToastAndroid.BOTTOM,
                                          15,
                                          50,
                                        )
                                      }                                   
  const onDelete=()=>{

    const id=enablelist[itemselect].idSelect;

                            const newList=props.diagnosis_List.filter(e=>e.idSelect!==id);
                            const newListIMG=props.imgList.filter(e=>e.idSelect!==id);

                            ToastAndroid.showWithGravityAndOffset(
                                                                    'This report is being eliminated 🗑🗑🗑!',
                                                                    ToastAndroid.LONG,
                                                                    ToastAndroid.BOTTOM,
                                                                    25,
                                                                    50,
                                                                  );
                            batch(() => { 
                                          props.onUpdate_DIAGNOSIS("pictures_Diagnosis",newListIMG);
                                          props.onUpdate_DIAGNOSIS("diagnosis_List",newList);
                                    })

                            
                            storeData("pictures_Diagnosis",JSON.stringify(newListIMG));
                            storeData("diagnosis_List",JSON.stringify(newList));
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
                                              navigation={props.navigation}
                                              setItemselect={setItemselect}
                                              AddLabor={AddLabor}
                                              type={props.route.params.type}/>
                    </Layout>

                    <Layout style={[styles.layout,{marginLeft:10}]} level='2'>
                          
                          <ListOfResources  navigation={props.navigation}
                                           
                                            onDelete={onDelete}
                                            onDelete_Picture={onDelete_Picture}
                                            onUpdate_DIAGNOSIS={props.onUpdate_DIAGNOSIS}
                                            UPDATE_Clock_LIST={props.UPDATE_Clock_LIST}
                                            type={props.route.params.type}
                                            userName={props.userName}
                                            diagnosis_List={props.diagnosis_List} 
                                            enablelist={enablelist} 
                                            itemselect={itemselect}
                                            FeaturesList={props.FeaturesList} 
                                           
                                            Clock_List={props.Clock_List}
                                            pictureArray={pictureArray.filter(e=>e.idSelect===enablelist[itemselect].idSelect)}/>
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








