import React, { Component } from 'react';
import { StyleSheet  } from 'react-native';
import {
  Layout,
} from '@ui-kitten/components';



import {MultiCard} from "../../../components/Modal_Diagnosis/modal-diagnosis-selector.componet"
import {storageDiagnosis,diagnosisFeatures} from "../Mechanics/auxiliarFunc"



export const DiagnosisChart =(props)=>{


          
          return <Layout style={[styles.tabContainer,{marginBottom:300}]}>
                  <MultiCard  
                              featureTree={diagnosisFeatures(props.FeaturesList)} 
                              listChecked={props.DiagnosisArray.length>0?props.DiagnosisArray[0].snap:[]}
                              {...props}
                              onUpdate_DIAGNOSIS={(pro,val)=>{
                                storageDiagnosis( val,
                                                        props.route.params.item.IdMaintenance,
                                                        props.SO_Diagnosis_OffLine,
                                                        props.DiagnosisArrayOriginal,
                                                        props.onUpdate_EDIT_SO
                                      )

                                  
                              }}
                              origen={"editOrder"}
                  />
          </Layout>
  
        }
  
  
      
  
  
  
    
  const styles = StyleSheet.create({
    tabContainer: {
      minHeight: 600,
    },
  });