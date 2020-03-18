import React ,{useEffect} from 'react';
import { StyleSheet ,Alert ,ToastAndroid} from 'react-native';
import {
  Layout,
} from '@ui-kitten/components';


import {TopNavigationDiagnosis} from "./TopNavigator.component"
import {ListOfCommitments} from "./ListOfCommitments.component"
import {ListOfResources} from  "./Resources/ListOfResources.component"

import {storeData} from "../../globalFunc_Use/globalJSFunctions"
import { AppRoute } from '../../navigation/app-routes';


import { Read_Diag_SO } from "../../SQL/SendSOData/Diagnosis_Service_Order"
import {Loading} from "../EditOrder/TopNavigator.component"
import { batch } from 'react-redux';












export const EditFileScreen =(props)=>{

 

/******************* STATE TO SUBMIT *******************/
  

const [itemselect, setItemselect] = React.useState(-1);
const [item, setItem] = React.useState(null);
const [enablelist,setEnablelist]=React.useState([])

const [pictureArray,setpictureArray]=React.useState([])

const [DiagnosisArray_DataBase, setDiagnosisArray_DataBase] = React.useState([]);   
const [pictureDataBase,setpictureDataBase]=React.useState([])
const [spin, setSpin] = React.useState(false);
//


useEffect(() => {
          //Diagnosis
          itemselect===-1?setItemselect(0):null
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
                                            

}, [JSON.stringify(props.diagnosis_List).length]);

useEffect(() => {
  
  setpictureArray(props.imgList)

},[props.imgList.length])


const UpdateDataBase= ()=>{
  setSpin(true);
  Read_Diag_SO(props.route.params.item.IdMaintenance
                  ,(x)=>{
                    setSpin(false);
                    setDiagnosisArray_DataBase(x.filter(s=>s.IDSysScheme===props.route.params.item.feature)
                                                .map(elem=>{
  
                                                                    const list=props.FeaturesList.filter(f=>f.SubId===elem.IDSysScheme);
                                                                  
                                                                                                            return {
                                                                                                                        Description: list[0].Description,
                                                                                                                        
                                                                                                                        IDCatEquip: props.route.params.item.IDCatEquip, 
                                                                                                                        IdMaintenance: elem.IdMaintenance, 
                                                                                                                        activity: "disable", 
                                                                                                                        
                                                                                                                        categoryId: list[0].Id, 
                                                                                                                        
                                                                                                                        check: true, 
                                                                                                                        date: elem.date.date.slice(0,10), 
                                                                                                                        description: elem.description,
                                                                                                                        equipmentCod: props.route.params.item.equipmentCod, 
                                                                                                                        explanation: elem.explanation, 
                                                                                                                        
                                                                                                                        feature: elem.IDSysScheme, 
                                                                                                                        
                                                                                                                        idSelect: elem.IdDiagLabor,
                                                                                                                        idmechanic:elem.idMechanics, 
                                                                                                                        mechanic:props.MechanicList.filter(e=>e.IdEmployee===elem.idMechanics)[0].short_name,
                                                                                                                        signed: elem.signed===1?true:false,
                                                                                                                        orderclosed:elem.status===1?true:false
                                                                                                                      }
                                                                }));
                }
  );
}

const EditDataBase=(id,des,exp)=>{
    const newArr= DiagnosisArray_DataBase.map(e=>{
                                                return id===e.idSelect?{
                                                                          ...e,
                                                                          description:des,
                                                                          explanation:exp
                                                                        }:e
    });
   
  setDiagnosisArray_DataBase(newArr)
}


useEffect(UpdateDataBase,[])


const UploadEdit=(newElem)=>{
    const newdiagnosis_List= props.diagnosis_List.map(e=>{
                  return e.idSelect===newElem.idSelect?newElem:e
                })
    ToastAndroid.showWithGravity("Saving Description and Explanation",ToastAndroid.SHORT,ToastAndroid.TOP)
    props.onUpdate_DIAGNOSIS("diagnosis_List",newdiagnosis_List) 
    storeData("SO_diagnosis_List",JSON.stringify(newdiagnosis_List));           
}

  const AddLabor =()=>{
    var d= new Date;
    var date=d.toISOString().slice(0,10);
    var idm=props.MechanicList.filter(x=>x.short_name===props.userName)[0]
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
                      idSelect:  parseFloat(Math.random()*1000000+"").toFixed(0), 
                      idmechanic: idm.IdEmployee,
                      signed: false
                    }

  const newarr=[newElem].concat(props.diagnosis_List);
//console.log(newarr)
  props.onUpdate_DIAGNOSIS("diagnosis_List",newarr);
  storeData("SO_diagnosis_List",JSON.stringify(newarr));
  setItemselect(-1)
  setItemselect(0)
  }
  const onUpload_Picture=(newElem)=>{
                                        const newArr=props.imgList.concat(newElem)

                                        props.onUpdate_DIAGNOSIS("pictures_Diagnosis",newArr);
                                        storeData("SO_pictures_Diagnosis",JSON.stringify(newArr));
                                      }
  const onDelete_Picture=(newElem)=>{
                                        const newArr=props.imgList.filter(e=>e.PictureID!==newElem.PictureID)
                                        props.onUpdate_DIAGNOSIS("pictures_Diagnosis",newArr);
                                        storeData("SO_pictures_Diagnosis",JSON.stringify(newArr));
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

                            
                            storeData("SO_pictures_Diagnosis",JSON.stringify(newListIMG));
                            storeData("SO_diagnosis_List",JSON.stringify(newList));
                        }



 return (
    <Layout style={styles.container} level="4">

             <TopNavigationDiagnosis navigation={props.navigation} 
                                     title={item===null?"":item.SubTitle} 
                                     subtitle={item===null?"":"Equipment : "+item.equipmentCod}
                                                  />
              
              <Layout style={[styles.containerLayout,{marginTop:15}]}level="4">

                    <Layout style={[styles.layout,{maxWidth:500}]} level='2'>
                          
                          <ListOfCommitments  enablelist={enablelist.concat(DiagnosisArray_DataBase)}  
                                              itemselect={itemselect} 
                                              navigation={props.navigation}
                                              spin={spin}
                                              setItemselect={setItemselect}
                                              AddLabor={AddLabor}
                                              type={"edit"}/>
                    </Layout>

                    <Layout style={[styles.layout,{marginLeft:10}]} level='2'>
                          
                          <ListOfResources  navigation={props.navigation}
                                            UploadEdit={UploadEdit}
                                            onDelete={onDelete}
                                            onDelete_Picture={onDelete_Picture}
                                            onUpdate_DIAGNOSIS={props.onUpdate_DIAGNOSIS}
                                            UPDATE_Clock_LIST={props.UPDATE_Clock_LIST}
                                            type={"edit"}
                                            userName={props.userName}
                                          //  diagnosis_List={props.diagnosis_List} 
                                            enablelist={enablelist.concat(DiagnosisArray_DataBase)} 
                                            itemselect={itemselect}
                                            FeaturesList={props.FeaturesList}
                                            EditDataBase={EditDataBase}
                                            Clock_List={props.Clock_List}
                                            pictureArray={pictureArray.filter(e=>e.idSelect===enablelist.concat(DiagnosisArray_DataBase)[itemselect].idSelect)}
                              />
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








