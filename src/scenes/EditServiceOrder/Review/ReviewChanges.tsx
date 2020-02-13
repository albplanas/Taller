import React from 'react';
import { StyleSheet, ScrollView,SafeAreaView} from 'react-native';
import {
  Divider,
  Layout,
  Text,
  Card,
  Button,
} from '@ui-kitten/components';

import { UserPlus_Icon,UserSlash_Icon,Tools_Icon,Images_Icon,ToolsIcon,
          UserStetoscope_Icon, User_Icon,FolderPlus_Icon,Folder_Icon,FolderSlash_Icon } from '../../../assets/icons';
import {dataDiagnosisConstruction ,
        dataMechanicsConstruction,
        } from "../constructionModel"

import {deleteLabor,storageDiagnosis} from "../Mechanics/auxiliarFunc"
import {LeftList } from "../Extra_Info/List"
import {CardLayout,HeaderCard} from './CardLayout'
import {storeData} from "../Extra_Info/helperfunc.js"


export const ReviewChanges =(props)=>{

    var deleteLabElement=(id)=>deleteLabor(id,props.MechanicArray,props.onUpdate_EDIT_SO)
    
    var updateDiagnosis=(val)=>storageDiagnosis(val, props.route.params.item.IdMaintenance,
                                                    props.SO_Diagnosis_OffLine,
                                                    props.DiagnosisArrayOriginal,
                                                    props.onUpdate_EDIT_SO)
    
   // updateDiagnosis([180])

    
     var dataDiagnosis = dataDiagnosisConstruction(props.DiagnosisArray,props.DiagnosisArrayOriginal,props.FeaturesList);

     var dataMechanics = dataMechanicsConstruction(props.MechanicArray,props.MechanicArrayOriginal);
     
      var numOfChangesd=props.DiagnosisArray[0].cancel.length+props.DiagnosisArray[0].plus.length;
      var numOfChangesm=props.MechanicArray.length
    return(
          <Layout style={[styles.tabContainer,{marginBottom:150}]}>
                      <Layout style={[{margin:20}]}>
                                      <Text category="h3" style={{textAlign:"center", marginBottom:5}} status="warning">Please Review your changes carefully  👀 👀 👀</Text>
                                      <Divider style={{ marginBottom:5}}/>
                                    <SafeAreaView >
                                     <ScrollView >
                                      <Layout style={[styles.rowContainer]}>


                                          <CardLayout  data={dataDiagnosis}
                                                      delete={(val)=>updateDiagnosis(val)}
                                                      iconHead={()=><UserStetoscope_Icon color={"#17a2b8"}/>} 
                                                      title="DIAGNOSES"
                                                      description={numOfChangesd>0?numOfChangesd+" Changes":"No changes made"}
                                                      iconSet={[Folder_Icon,()=><FolderPlus_Icon color="#007bff"/>,()=><FolderSlash_Icon color="#dc3545"/>]}/>


                                          <CardLayout  data={dataMechanics}
                                                      delete={(id)=>deleteLabElement(id)}
                                                      iconHead={ToolsIcon} 
                                                      title="MECHANICAL LABOR"
                                                      description={numOfChangesm>0?numOfChangesm+" Changes":"No changes made"}
                                                      iconSet={[User_Icon,UserPlus_Icon,UserSlash_Icon]}/>
                                          
                                          <Layout style={[styles.layout,{padding:5}]} level='4'>
                                                
                                                      
                                                      <Card style={[styles.card,{width:"100%",paddingBottom:40}]} header={()=><HeaderCard icon={Images_Icon} title="EXTRA MATERIALS"/>} status='success'>
                                                            <LeftList data={props.ExtraArrayOriginal} 
                                                                      setData={(obj)=>storeData(obj,props.SO_ExtraInfo_OffLine,props.onUpdate_EDIT_SO,props.setExtraArrayOriginal)} />
                                                           
                                                      </Card>
                                      
                                          </Layout>

                                      </Layout>
                                    </ScrollView>
                                  </SafeAreaView>
                      </Layout>
                  </Layout>      
          )
          }




const styles = StyleSheet.create({

    container: {
      flex: 1,
    },

    layout: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: 'center',
    },

    card: {
      marginVertical: 8,
    },

    rowContainer: {
      flexDirection: 'row',
    },
    tabContainer: {
      minHeight: 600,
    },
  });