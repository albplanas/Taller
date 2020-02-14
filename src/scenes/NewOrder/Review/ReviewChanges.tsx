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



      var newArr = props.DiagnosisArrayOriginal.map(x=>{
            return props.FeaturesList.filter(e=>e.SubId===x)[0];
            
      });

      var numOfChangesd=props.DiagnosisArrayOriginal.length;

   
  

    return(
          <Layout style={[styles.tabContainer,{marginBottom:150}]}>
                      <Layout style={[{margin:20}]}>

                                      <Text category="h3" style={{textAlign:"center", marginBottom:5}} status="warning">Please Review your changes carefully  👀 👀 👀</Text>
                                      <Divider style={{ marginBottom:5}}/>
                                     <ScrollView >
                                      <Layout style={[styles.rowContainer]}>


                                        <CardLayout   data={newArr}
                                                      delete={(val)=>{
                                                                          props.setDiagnosisArrayOriginal(val);
                                                                          storeData("diagnosis_List",JSON.stringify(val))
                                                               }
                                                              }
                                                      iconHead={()=><UserStetoscope_Icon color={"#17a2b8"}/>} 
                                                      title="DIAGNOSES"
                                                      description={numOfChangesd>0?numOfChangesd+" Changes":"No changes made"}
                                                      iconSet={[Folder_Icon,()=><FolderPlus_Icon color="#007bff"/>,()=><FolderSlash_Icon color="#dc3545"/>,PlusIcon]}
                                                      actionHeaderLeft={()=>{ props.navigation!==undefined?
                                                                              props.navigation.navigate(AppRoute.MODAL,
                                                                                                        {
                                                                                                              item:props.route.params.item,
                                                                                                              DiagnosisArrayOriginal:[]
                                                                                                        
                                                                                                        }):null}}
                                                      />
      
                                          <Layout style={[styles.layout,{padding:5}]} level='2'>
                                                
                                                      
                                                      <Card style={[styles.card,{width:"100%",paddingBottom:40}]} header={()=><HeaderCard icon={Images_Icon} title="EXTRA MATERIALS"/>} status='success'>
                                                            <LeftList data={props.ExtraArrayOriginal} 
                                                                      setData={(obj)=>{
                                                                                        props.setExtraArrayOriginal(obj);
                                                                                        storeData("ExtraInfo_Diagnosis",JSON.stringify(obj))}
                                                                                        } />
                                                           
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