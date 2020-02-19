import React from 'react';
import { StyleSheet, ScrollView} from 'react-native';
import {
  Divider,
  Layout,
  Text,
  Card,
  Button,
} from '@ui-kitten/components';

import {AppRoute} from "../../../navigation/app-routes"

import { Images_Icon,PlusIcon,UserStetoscope_Icon, FolderPlus_Icon,Folder_Icon,FolderSlash_Icon } from '../../../assets/icons';


//import {deleteLabor,storageDiagnosis} from "../Mechanics/auxiliarFunc"
import {LeftList } from "../Extra_Info/List"
import {CardLayout,HeaderCard} from './CardLayout'
import {storeData} from "../globalJSFunctions"








export const ReviewChanges =(props)=>{


  //Diagnosis Aarguments
      var newArr = props.DiagnosisArray.filter(e=>e.IDCatEquip===props.route.params.item.IDCatEquip).map(x=>{
            var proper =props.FeaturesList.filter(e=>e.SubId===x.feature)[0];
            return {
              ... x,
              Title:proper.Title,
              SubTitle:proper.Description
            }
            
      });
    
      var numOfChangesd=props.DiagnosisArray.length;

      const DeleteDiagnosis=(val)=>{
        props.setDiagnosisArray(val);
        storeData("diagnosis_List",JSON.stringify(val))
      }
      const iconHeadDiagnosis=()=><UserStetoscope_Icon color={"#17a2b8"}/>
      const iconHeadSetDiagnosis=()=>[Folder_Icon,()=><FolderPlus_Icon color="#007bff"/>,()=><FolderSlash_Icon color="#dc3545"/>,PlusIcon]
    
      const actionHeaderLeft=()=>{  props.navigation!==undefined?
                                    props.navigation.navigate(AppRoute.MODAL,
                                                              {
                                                                    item:props.route.params.item,
                                                                    DiagnosisArrayOriginal:[1],
                                                                    idmechanic:props.idmechanic,
                                                                    originalRoute:"diagnosis"
                                                              
                                                              }):null}
      
      // Extra Info
      const setData=(obj)=>{    props.setExtraArrayOriginal(obj);
                                storeData("ExtraInfo_Diagnosis",JSON.stringify(obj))}
                                 
       const headerExtraInfo=()=><HeaderCard icon={Images_Icon} title="EXTRA MATERIALS"/>
    return(
          <Layout style={[styles.tabContainer,{marginBottom:150}]}>
                      <Layout style={[{margin:20}]}>

                                      <Text category="h3" style={{textAlign:"center", marginBottom:5}} status="warning">Please Review your changes carefully  👀 👀 👀</Text>
                                     <Divider style={{ marginBottom:5}}/>
                                     <ScrollView >
                                      <Layout style={[styles.rowContainer]}>


                                              <CardLayout   data={newArr}
                                                            navigation={props.navigation}
                                                            delete={DeleteDiagnosis}
                                                            idmechanic={props.idmechanic}        
                                                            iconHead={iconHeadDiagnosis} 
                                                            title="DIAGNOSES"
                                                            description={numOfChangesd>0?numOfChangesd+" Changes":"No changes made"}
                                                            iconSet={iconHeadSetDiagnosis}
                                                            actionHeaderLeft={actionHeaderLeft}
                                                            />
      
                                          <Layout style={[styles.layout,{padding:5}]} level='2'>
                                                
                                               <Card style={[styles.card,{width:"100%",paddingBottom:40}]} 
                                                      header={headerExtraInfo} 
                                                      status='success'>
                                                            <LeftList data={props.ExtraArrayOriginal} 
                                                                      setData={setData} />
                                                           
                                                      </Card>
                                      
                                          </Layout>

                                      </Layout>
                                    </ScrollView>
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